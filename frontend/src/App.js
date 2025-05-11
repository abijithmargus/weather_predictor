import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    precipitation: "",
    temp_max: "",
    temp_min: "",
    wind: "",
  });
  const [result, setResult] = useState(null);
  const [accuracy,setAcc] = useState(null);
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
    setAcc(res.data.accuracy)
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Weather Predictor</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="precipitation"
          placeholder="Precipitation"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="temp_max"
          placeholder="Max Temp"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="temp_min"
          placeholder="Min Temp"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="wind"
          placeholder="Wind"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Predict</button>
      </form>
      {result && <h3>Prediction: {result}</h3>}
      <h3>{accuracy}</h3>
    </div>
  );
}

export default App;
