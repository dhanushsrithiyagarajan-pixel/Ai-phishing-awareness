"""
Automated Test Suite for Phishing Rule Engine & Flask API
Comprehensive tests covering functional scenarios, edge cases, false-positive baselines,
all 8 fictional training scenarios, and all REST API endpoints.
"""

import unittest
import json
import os
from app import app
from analyzer.rule_engine import PhishingRuleEngine
from analyzer.ai_client import MessageAnalyzerService


class TestPhishingRuleEngine(unittest.TestCase):
    def setUp(self):
        self.engine = PhishingRuleEngine()
        data_path = os.path.join(os.path.dirname(__file__), "..", "data", "training_samples.json")
        with open(data_path, "r", encoding="utf-8") as f:
            self.samples = json.load(f)

    def test_empty_message(self):
        result = self.engine.analyze("")
        self.assertEqual(result["classification"], "Indeterminate")
        self.assertEqual(result["score"], 0)
        self.assertEqual(result["risk_level"], "None")

    def test_all_eight_training_samples_individually(self):
        """Verifies that every single one of the 8 fictional samples matches its expected classification."""
        self.assertEqual(len(self.samples), 8, "Expected exactly 8 fictional training samples")

        for sample in self.samples:
            sample_id = sample["id"]
            expected = sample["expected_classification"]
            result = self.engine.analyze(sample["body"], sender_header=sample.get("sender", ""))
            
            self.assertEqual(
                result["classification"],
                expected,
                f"Sample {sample_id} ('{sample['title']}') failed classification. "
                f"Expected: '{expected}', Got: '{result['classification']}' (Score: {result['score']})"
            )

    def test_sample_1_fake_college_account_warning(self):
        s1 = self.samples[0]
        result = self.engine.analyze(s1["body"], sender_header=s1["sender"])
        self.assertEqual(result["classification"], "Likely phishing")
        self.assertEqual(result["risk_level"], "High")
        self.assertGreaterEqual(result["score"], 60)
        indicator_names = [i["name"] for i in result["indicators"]]
        self.assertIn("Direct Credential Request", indicator_names)
        self.assertIn("Deceptive Sender Header", indicator_names)

    def test_sample_2_scholarship_advance_fee(self):
        s2 = self.samples[1]
        result = self.engine.analyze(s2["body"], sender_header=s2["sender"])
        self.assertEqual(result["classification"], "Likely phishing")
        self.assertGreaterEqual(result["score"], 60)
        indicator_names = [i["name"] for i in result["indicators"]]
        self.assertIn("Irreversible Payment or Wire Demand", indicator_names)

    def test_sample_3_job_scam_fake_check(self):
        s3 = self.samples[2]
        result = self.engine.analyze(s3["body"], sender_header=s3["sender"])
        self.assertEqual(result["classification"], "Likely phishing")
        self.assertGreaterEqual(result["score"], 60)
        indicator_names = [i["name"] for i in result["indicators"]]
        self.assertIn("Fake Check / Overpayment Pretext", indicator_names)
        self.assertIn("Recruitment Scam Vendor Pretext", indicator_names)

    def test_sample_4_parcel_delivery_smishing(self):
        s4 = self.samples[3]
        result = self.engine.analyze(s4["body"], sender_header=s4["sender"])
        self.assertEqual(result["classification"], "Suspicious — needs verification")
        self.assertEqual(result["risk_level"], "Medium")

    def test_sample_5_bank_impersonation_vishing_otp(self):
        s5 = self.samples[4]
        result = self.engine.analyze(s5["body"], sender_header=s5["sender"])
        self.assertEqual(result["classification"], "Likely phishing")
        indicator_names = [i["name"] for i in result["indicators"]]
        self.assertIn("Multi-Factor Authentication (MFA/OTP) Interception", indicator_names)

    def test_sample_6_bursar_urgent_tuition_notice(self):
        s6 = self.samples[5]
        result = self.engine.analyze(s6["body"], sender_header=s6["sender"])
        self.assertEqual(result["classification"], "Likely phishing")
        self.assertGreaterEqual(result["score"], 60)

    def test_sample_7_legitimate_cs101_announcement(self):
        s7 = self.samples[6]
        result = self.engine.analyze(s7["body"], sender_header=s7["sender"])
        self.assertEqual(result["classification"], "Likely legitimate")
        self.assertEqual(result["risk_level"], "Low")
        self.assertLessEqual(result["score"], 20)
        positive_names = [p["name"] for p in result["positive_indicators"]]
        self.assertIn("Authentic Academic Coursework Context", positive_names)

    def test_sample_8_legitimate_placement_schedule(self):
        s8 = self.samples[7]
        result = self.engine.analyze(s8["body"], sender_header=s8["sender"])
        self.assertEqual(result["classification"], "Likely legitimate")
        self.assertEqual(result["risk_level"], "Low")
        self.assertLessEqual(result["score"], 20)
        positive_names = [p["name"] for p in result["positive_indicators"]]
        self.assertIn("Defensive Security Hygiene / Official Warnings", positive_names)


class TestMessageAnalyzerService(unittest.TestCase):
    def setUp(self):
        self.service = MessageAnalyzerService()

    def test_status_demo_mode(self):
        status = self.service.get_status()
        self.assertIn(status["mode"], ["demo_heuristic", "live_ai"])
        self.assertIn("engine_name", status)
        self.assertIn("message", status)

    def test_service_analyze_fallback(self):
        result = self.service.analyze("URGENT: Submit your password at https://fake.test/login")
        self.assertEqual(result["classification"], "Likely phishing")
        self.assertIn("safe_actions", result)
        self.assertIn("disclaimer", result)


class TestFlaskEndpoints(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_index_route(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"AI Phishing Awareness Campaign Kit", response.data)
        self.assertIn(b"Phishing Analyzer", response.data)
        self.assertIn(b"Learning Center", response.data)

    def test_poster_route(self):
        response = self.client.get("/poster")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"CAMPUS CYBER DEFENSE", response.data)

    def test_presentation_route(self):
        response = self.client.get("/presentation")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Capstone Presentation", response.data)

    def test_api_status(self):
        response = self.client.get("/api/status")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("mode", data)
        self.assertIn("engine_name", data)

    def test_api_samples(self):
        response = self.client.get("/api/samples")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 8)

    def test_api_quiz(self):
        response = self.client.get("/api/quiz")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 10)
        for q in data:
            self.assertIn("question", q)
            self.assertEqual(len(q["options"]), 4)
            self.assertIn("correct_index", q)
            self.assertIn("explanation", q)

    def test_api_modules(self):
        response = self.client.get("/api/modules")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 8)

    def test_api_checklist(self):
        response = self.client.get("/api/checklist")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 8)

    def test_api_social(self):
        response = self.client.get("/api/social")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 5)

    def test_api_presentation(self):
        response = self.client.get("/api/presentation")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 7)

    def test_api_analyze_valid_phishing(self):
        payload = {
            "text": "Your campus account will be deleted in 24 hours! Submit password at https://fake.test/login",
            "sender": "admin@fake.test"
        }
        response = self.client.post("/api/analyze", data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data["classification"], "Likely phishing")
        self.assertGreaterEqual(data["score"], 60)

    def test_api_analyze_legitimate(self):
        payload = {
            "text": "CS101 Fall Midterm relocated to Turing Hall. Slides available on Canvas LMS.",
            "sender": "arthur.pendelton@faculty.example.edu"
        }
        response = self.client.post("/api/analyze", data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data["classification"], "Likely legitimate")

    def test_api_analyze_empty_payload(self):
        payload = {"text": ""}
        response = self.client.post("/api/analyze", data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn("error", data)

    def test_api_404_handling(self):
        response = self.client.get("/api/nonexistent-endpoint")
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertIn("error", data)


if __name__ == "__main__":
    unittest.main()
