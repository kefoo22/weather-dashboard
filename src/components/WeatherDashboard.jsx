import { useState } from "react";
import { fetchWeather } from "../services/weatherApi";

function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setWeather(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError("Oops! Couldn’t find that city. Try again.");
    }
  };

  const handleReset = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  const getClothingRecommendation = (temp) => {
    if (temp < 10) return "🧥 Wear a warm jacket!";
    if (temp < 20) return "👕 Light sweater recommended.";
    return "😎 T-shirt weather!";
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">🌤 Weather Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {weather && (
        <div className="text-center">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="mx-auto"
          />
          <p className="text-lg">🌡 {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>

          <div className="mt-3 p-3 bg-blue-100 rounded-lg">
            {getClothingRecommendation(weather.main.temp)}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
