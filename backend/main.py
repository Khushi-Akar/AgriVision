from fastapi import FastAPI, File, UploadFile, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import shutil
import os
import uuid

from model.predict import load_model, predict
from nlp.advisor import get_advice
from database.models import SessionLocal, ScanRecord

app = FastAPI(title="AgriVision API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Lazy load model
cv_model = None

def get_model():
    global cv_model
    if cv_model is None:
        cv_model = load_model()
    return cv_model


@app.get("/")
def root():
    return {"message": "AgriVision API is running"}


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/scan")
async def scan_crop(
    file: UploadFile = File(...),
    location: str = Form(default=None),
    db: Session = Depends(get_db)
):
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    save_path = f"./uploads/{filename}"

    os.makedirs("./uploads", exist_ok=True)

    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    result = predict(save_path, get_model())
    advice = get_advice(result["class"], result["confidence"])

    crop_name = result["class"].split("___")[0]

    record = ScanRecord(
        image_filename=filename,
        crop_type=crop_name,
        disease_detected=result["class"],
        confidence=result["confidence"],
        severity=advice.get("severity", "Unknown"),
        treatment_given=advice.get("treatment", ""),
        is_healthy=1 if result["is_healthy"] else 0,
        location=location,
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return JSONResponse({
        "id": record.id,
        "detection": result,
        "advice": advice
    })


@app.get("/api/history")
def get_history(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 20
):
    records = (
        db.query(ScanRecord)
        .order_by(ScanRecord.scan_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return records


@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    total = db.query(ScanRecord).count()
    diseased = db.query(ScanRecord).filter(ScanRecord.is_healthy == 0).count()

    return {
        "total_scans": total,
        "diseased": diseased,
        "healthy": total - diseased
    }