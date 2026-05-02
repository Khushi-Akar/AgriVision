import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemma-3-27b-it:free"


def fallback_advice(disease: str, confidence: float):
    crop = disease.split("___")[0]

    if "healthy" in disease.lower():
        return {
            "severity": "None",
            "summary": f"{crop} plant appears healthy.",
            "treatment": "No treatment is required. Continue regular care and monitoring.",
            "prevention": "Maintain proper watering, sunlight, spacing, and check leaves regularly.",
            "urgency": "low",
            "estimated_yield_loss": "0%"
        }

    return {
        "severity": "Medium",
        "summary": f"{disease} was detected with {confidence:.2f}% confidence.",
        "treatment": "Remove affected leaves, avoid overhead watering, improve air circulation, and use a suitable fungicide if symptoms spread.",
        "prevention": "Use disease-free seeds, rotate crops, keep leaves dry, remove infected plant debris, and monitor plants regularly.",
        "urgency": "medium",
        "estimated_yield_loss": "Unknown"
    }


def get_advice(disease: str, confidence: float):
    if not OPENROUTER_API_KEY:
        return fallback_advice(disease, confidence)

    if "healthy" in disease.lower():
        return fallback_advice(disease, confidence)

    prompt = f"""
You are an agriculture expert.

A crop disease detection model predicted:
Disease: {disease}
Confidence: {confidence:.2f}%

Respond ONLY as valid JSON with this exact format:
{{
  "severity": "Low/Medium/High",
  "summary": "short disease explanation",
  "treatment": "clear treatment steps",
  "prevention": "clear prevention steps",
  "urgency": "low/medium/high",
  "estimated_yield_loss": "percentage range"
}}
"""

    try:
        response = requests.post(
            OPENROUTER_URL,
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://agrivision-xi.vercel.app",
                "X-Title": "AgriVision"
            },
            json={
                "model": MODEL,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            },
            timeout=30
        )

        response.raise_for_status()

        data = response.json()
        text = data["choices"][0]["message"]["content"].strip()

        if text.startswith("```json"):
            text = text.replace("```json", "").replace("```", "").strip()
        elif text.startswith("```"):
            text = text.replace("```", "").strip()

        return json.loads(text)

    except Exception as e:
        print(f"OpenRouter advisory failed: {e}")
        return fallback_advice(disease, confidence)