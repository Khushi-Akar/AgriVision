from sqlalchemy import Column, Integer, String, Float, DateTime, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

engine = create_engine("sqlite:///./agrivision.db")

SessionLocal = sessionmaker(bind=engine)


class ScanRecord(Base):
    __tablename__ = "scan_records"

    id = Column(Integer, primary_key=True, index=True)
    image_filename = Column(String)
    crop_type = Column(String)
    disease_detected = Column(String)
    confidence = Column(Float)
    severity = Column(String)
    treatment_given = Column(String)
    is_healthy = Column(Integer)  # 0 or 1
    location = Column(String, nullable=True)
    scan_date = Column(DateTime, default=datetime.utcnow)


# Create tables
Base.metadata.create_all(bind=engine)