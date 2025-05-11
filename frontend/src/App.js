import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import custom styles

function App() {
  const [form, setForm] = useState({
    precipitation: "",
    temp_max: "",
    temp_min: "",
    wind: "",
  });
  const [result, setResult] = useState(null);
  const [accuracy, setAcc] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:5000/predict", {
      precipitation: parseFloat(form.precipitation),
      temp_max: parseFloat(form.temp_max),
      temp_min: parseFloat(form.temp_min),
      wind: parseFloat(form.wind),
    });
    setResult(res.data.prediction);
    setAcc(res.data.accuracy);
  };

  return (
    <div className="app-container">
      <h2 className="title">Weather Predictor</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          name="precipitation"
          placeholder="Precipitation"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          name="temp_max"
          placeholder="Max Temp"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          name="temp_min"
          placeholder="Min Temp"
          onChange={handleChange}
          required
          className="input-field"
        />
        <input
          name="wind"
          placeholder="Wind"
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Predict
        </button>
      </form>
      {result && <h3 className="result">Prediction: {result}</h3>}
      <h3 className="accuracy">{accuracy}</h3>
    </div>
  );
}

export default App;
