from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from sklearn.metrics import accuracy_score

from model import X_test
from model import y_test

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load the model
model = joblib.load('model.pkl')
y_pred=model.predict(X_test)
accuracy=accuracy_score(y_test,y_pred)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    values = [data['precipitation'], data['temp_max'], data['temp_min'], data['wind']]
    prediction = model.predict([values])[0]
    return jsonify({'prediction': prediction,'accuracy':accuracy})

if __name__ == '__main__':
    app.run(debug=True)