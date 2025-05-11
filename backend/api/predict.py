from http.server import BaseHTTPRequestHandler
import json
import joblib
import numpy as np
from model import X_test, y_test
from sklearn.metrics import accuracy_score

model = joblib.load('model.pkl')
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length)
        data = json.loads(body)

        values = [data['precipitation'], data['temp_max'], data['temp_min'], data['wind']]
        prediction = model.predict([values])[0]

        response = {
            'prediction': prediction,
            'accuracy': accuracy
        }

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
