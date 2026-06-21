import os
import base64
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PIL import Image
import io

load_dotenv()

app = Flask(__name__)
CORS(app)

ROBOFLOW_API_KEY = os.getenv("ROBOFLOW_API_KEY")
ROBOFLOW_MODEL_ID = os.getenv("ROBOFLOW_MODEL_ID")

# Cell information database
CELL_INFO = {
    "columnar_epithelia": {
        "function": "Lines the inner surfaces of organs and glands",
        "biological_role": "Secretion, absorption, and protection of internal surfaces",
        "clinical_relevance": "Abnormalities may indicate adenocarcinoma or inflammatory bowel disease"
    },
    "eosinophil": {
        "function": "Combats parasitic infections and mediates allergic responses",
        "biological_role": "Releases cytotoxic granules to destroy pathogens; modulates inflammation",
        "clinical_relevance": "Elevated counts indicate allergies, asthma, or parasitic infection (eosinophilia)"
    },
    "erythrocyte": {
        "function": "Transports oxygen from lungs to tissues and CO2 back",
        "biological_role": "Contains hemoglobin; biconcave shape maximizes surface area for gas exchange",
        "clinical_relevance": "Low counts indicate anemia; abnormal morphology seen in sickle cell disease"
    },
    "hemosiderophage": {
        "function": "Macrophage that has ingested and stored hemosiderin (iron)",
        "biological_role": "Recycles iron from degraded red blood cells; clears hemorrhage sites",
        "clinical_relevance": "Presence in BAL fluid indicates pulmonary hemorrhage or chronic congestion"
    },
    "lymphocyte": {
        "function": "Core cells of the adaptive immune system",
        "biological_role": "B-cells produce antibodies; T-cells coordinate immune response and kill infected cells",
        "clinical_relevance": "High counts seen in viral infections; low counts in immunodeficiency disorders"
    },
    "macrophage": {
        "function": "Phagocytosis of pathogens, dead cells, and debris",
        "biological_role": "Antigen presentation, cytokine secretion, tissue repair coordination",
        "clinical_relevance": "Activated macrophages found in chronic inflammation, tuberculosis, and sarcoidosis"
    },
    "mast_cell": {
        "function": "Releases histamine and other mediators during allergic reactions",
        "biological_role": "Initiates inflammatory response; important in wound healing and angiogenesis",
        "clinical_relevance": "Excess mast cells indicate mastocytosis; key role in anaphylaxis"
    },
    "neutrophil": {
        "function": "First responder to bacterial and fungal infections",
        "biological_role": "Phagocytosis, degranulation, and neutrophil extracellular trap (NET) formation",
        "clinical_relevance": "Elevated in bacterial infections; low counts (neutropenia) increase infection risk"
    }
}


def classify_with_roboflow(image_bytes: bytes) -> dict:
    """Send image to Roboflow classification API and return results."""
    encoded = base64.b64encode(image_bytes).decode("utf-8")
    url = f"https://classify.roboflow.com/{ROBOFLOW_MODEL_ID}?api_key={ROBOFLOW_API_KEY}"
    response = requests.post(
        url,
        data=encoded,
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    response.raise_for_status()
    return response.json()


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": ROBOFLOW_MODEL_ID})


@app.route("/classify", methods=["POST"])
def classify():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files["image"]
    image_bytes = file.read()

    # Validate and resize if needed
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.thumbnail((1024, 1024))
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=90)
        image_bytes = buf.getvalue()
    except Exception as e:
        return jsonify({"error": f"Invalid image: {str(e)}"}), 400

    try:
        result = classify_with_roboflow(image_bytes)
    except requests.HTTPError as e:
        return jsonify({"error": f"Roboflow API error: {str(e)}"}), 502
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Parse predictions
    predictions = result.get("predictions", {})
    if not predictions:
        return jsonify({"error": "No predictions returned"}), 500

    # Sort by confidence
    sorted_preds = sorted(predictions.items(), key=lambda x: x[1]["confidence"], reverse=True)
    top_class = sorted_preds[0][0]
    top_conf = sorted_preds[0][1]["confidence"]

    top3 = [
        {"class": cls, "confidence": round(data["confidence"] * 100, 2)}
        for cls, data in sorted_preds[:3]
    ]

    cell_info = CELL_INFO.get(top_class, {
        "function": "Information not available",
        "biological_role": "Information not available",
        "clinical_relevance": "Information not available"
    })

    return jsonify({
        "predicted_class": top_class,
        "confidence": round(top_conf * 100, 2),
        "top3": top3,
        "all_predictions": [
            {"class": cls, "confidence": round(data["confidence"] * 100, 2)}
            for cls, data in sorted_preds
        ],
        "cell_info": cell_info
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
