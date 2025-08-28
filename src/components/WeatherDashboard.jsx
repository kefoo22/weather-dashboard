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
      setError("We couldn’t find that city. Please try another one 🌍");
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
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-2xl mt-6 sm:mt-10">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
        🌤 Weather Dashboard
      </h1>

      {/* Search + Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 w-full sm:w-auto"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-6 text-center bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-semibold mb-2">⚠️ Oops!</p>
          <p className="text-gray-700">{error}</p>
        </div>
      )}

      {/* Weather Info */}
      {weather && (
        <div className="text-center space-y-2">
          <h2 className="text-lg sm:text-xl font-semibold">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="mx-auto w-20 sm:w-24"
          />
          <p className="text-lg sm:text-xl">🌡 {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>

          {/* Clothing Recommendation */}
          <div className="mt-4 p-3 bg-blue-100 text-blue-800 font-medium rounded-lg">
            {getClothingRecommendation(weather.main.temp)}
          </div>
        </div>
      )}

      {/* Empty State (when no search yet) */}
      {!weather && !error && (
        <div className="mt-6 text-center text-gray-500">
          <p>🔎 Start by searching for a city above</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
