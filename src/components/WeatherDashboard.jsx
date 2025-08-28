import { useState } from "react";
import { fetchWeather } from "../services/weatherApi";

function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    if (!city) return;
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch {
      alert("City not found!");
    }
  };

  const handleReset = () => {
    setCity("");
    setWeather(null);
  };

  const getClothingAdvice = (temp) => {
    if (temp <= 5) return "Wear a heavy jacket 🧥";
    if (temp <= 15) return "Bring a sweater 🧶";
    if (temp <= 25) return "Light clothing is fine 👕";
    return "Stay cool in shorts 🩳";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">🌦 Weather Dashboard</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Reset
        </button>
      </div>

      {/* Weather Info */}
      {weather && (
        <div className="text-center">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto"
          />
          <p className="text-lg">🌡 Temp: {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p className="mt-4 font-medium text-green-700">
            {getClothingAdvice(weather.main.temp)}
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
