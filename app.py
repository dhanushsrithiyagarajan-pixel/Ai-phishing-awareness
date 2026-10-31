"""
AI Phishing Awareness Campaign Kit - Web Application & REST API
Built with Python Flask.
Serves interactive awareness dashboards, educational modules, training samples,
and automated defensive phishing message analysis.
"""

import os
import json
import logging
from flask import Flask, render_template, request, jsonify, send_from_directory
from dotenv import load_dotenv

# Load local environment configuration if available
load_dotenv()

from analyzer.ai_client import MessageAnalyzerService

# Initialize logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# Initialize Flask application
app = Flask(__name__, static_folder="static", template_folder="templates")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "capstone-cybersecurity-defense-kit-2026")

# Initialize Analyzer Service
analyzer_service = MessageAnalyzerService()

# Helper function to safely read JSON data files
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load_json_file(filename: str):
    file_path = os.path.join(DATA_DIR, filename)
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading {filename}: {e}")
        return []

# ----------------- Frontend Web Routes -----------------

@app.route("/")
def index():
    """Renders the main single-page application dashboard."""
    status = analyzer_service.get_status()
    return render_template("index.html", status=status)

@app.route("/poster")
def poster():
    """Renders the high-resolution printable HTML/CSS awareness poster / infographic."""
    return render_template("poster.html")

@app.route("/presentation")
def presentation():
    """Renders the fullscreen presentation slide deck viewer."""
    slides = load_json_file("presentation_data.json")
    return render_template("presentation.html", slides=slides)

# ----------------- REST API Endpoints -----------------

@app.route("/api/status", methods=["GET"])
def get_system_status():
    """Returns engine mode, active provider, and operational status."""
    return jsonify(analyzer_service.get_status())

@app.route("/api/analyze", methods=["POST"])
def analyze_message():
    """
    Analyzes submitted message text for phishing indicators.
    Accepts JSON body: {"text": "...", "sender": "..."}
    """
    try:
        data = request.get_json(force=True, silent=True) or {}
        text = data.get("text", "").strip()
        sender = data.get("sender", "").strip()

        if not text:
            return jsonify({
                "error": "No message text provided for analysis.",
                "classification": "Indeterminate",
                "risk_level": "None",
                "score": 0
            }), 400

        result = analyzer_service.analyze(text=text, sender=sender)
        return jsonify(result)

    except Exception as e:
        logger.error(f"Analysis error: {e}", exc_info=True)
        return jsonify({
            "error": "An error occurred during message processing.",
            "details": str(e)
        }), 500

@app.route("/api/samples", methods=["GET"])
def get_training_samples():
    """Returns the 8 clearly labelled fictional training scenarios."""
    samples = load_json_file("training_samples.json")
    return jsonify(samples)

@app.route("/api/quiz", methods=["GET"])
def get_quiz():
    """Returns the 10-question MCQ quiz with options and explanations."""
    quiz = load_json_file("quiz_questions.json")
    return jsonify(quiz)

@app.route("/api/modules", methods=["GET"])
def get_learning_modules():
    """Returns the 8 comprehensive educational awareness lessons."""
    modules = load_json_file("learning_modules.json")
    return jsonify(modules)

@app.route("/api/checklist", methods=["GET"])
def get_checklist_items():
    """Returns the red-flag checklist criteria and weights."""
    checklist = load_json_file("checklist_items.json")
    return jsonify(checklist)

@app.route("/api/social", methods=["GET"])
def get_social_campaign():
    """Returns the 5 ready-to-use social media campaign posts."""
    posts = load_json_file("social_campaign.json")
    return jsonify(posts)

@app.route("/api/presentation", methods=["GET"])
def get_presentation_data():
    """Returns the 7 presentation slide decks with presenter notes."""
    slides = load_json_file("presentation_data.json")
    return jsonify(slides)

# ----------------- Static File Delivery & Error Handlers -----------------

@app.errorhandler(404)
def not_found(e):
    if request.path.startswith("/api/"):
        return jsonify({"error": "Resource not found"}), 404
    return render_template("index.html", error="Page not found. Redirected to Dashboard."), 404

@app.errorhandler(500)
def server_error(e):
    if request.path.startswith("/api/"):
        return jsonify({"error": "Internal server error"}), 500
    return "<h3>Internal Server Error</h3><p>An unexpected condition was encountered.</p>", 500

if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "True").lower() in ("true", "1", "t")
    print(f"[*] Starting AI Phishing Awareness Kit on http://127.0.0.1:{port}")
    print("[*] Transparent demo heuristic mode is active by default. No paid API key required.")
    app.run(host="0.0.0.0", port=port, debug=debug)

