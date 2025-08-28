import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Demo cities for shuffle
  const demoCities = ["London", "New York", "Tokyo", "Nairobi", "Paris", "Johannesburg"];

  // 🌍 Auto-detect user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          setLoading(true);
          setError("");
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          setWeather(res.data);
        } catch {
          setError("Unable to fetch location weather ❌");
        } finally {
          setLoading(false);
        }
      });
    }
  }, []);

  // 🔎 Search city manually
  const fetchWeather = async (customCity) => {
    const targetCity = customCity || city;
    if (!targetCity) return;
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch {
      setError("⚠️ City not found. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // 🎲 Shuffle demo city
  const shuffleDemoCity = () => {
    const randomCity = demoCities[Math.floor(Math.random() * demoCities.length)];
    fetchWeather(randomCity);
  };

  const resetDashboard = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  // 🧥 Clothing recommendation
  const getClothingRecommendation = (temp) => {
    if (temp < 10) return "🧥 Wear a heavy jacket!";
    if (temp < 20) return "👕 Light sweater or hoodie!";
    return "😎 T-shirt weather!";
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        🌦 Weather Dashboard
      </h1>

      {/* Search bar */}
      <div className="flex w-full max-w-md gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow p-3 rounded-lg text-black outline-none"
        />
        <button
          onClick={() => fetchWeather()}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
        <button
          onClick={resetDashboard}
          className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Reset
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
      )}

      {/* Error with animation */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-4 bg-red-500 text-white rounded-lg shadow-md max-w-md text-center mb-4"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!weather && !error && !loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-10 px-4"
        >
          <p className="text-lg md:text-xl text-white/90">
            🔍 Enter a city above or allow location access
          </p>
          <p className="text-sm md:text-base text-white/70 mt-2">
            We'll show you live weather data and clothing suggestions.
          </p>
          {/* Shuffle demo city button */}
          <button
            onClick={shuffleDemoCity}
            className="mt-4 bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold shadow-md"
          >
            🎲 Shuffle Demo City
          </button>
        </motion.div>
      )}

      {/* Weather Card */}
      <AnimatePresence>
        {weather && (
          <motion.div
            key={weather.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md text-center"
          >
            <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
            <p className="text-lg">
              🌡 {weather.main.temp}°C | 💧 {weather.main.humidity}% | 🌬{" "}
              {weather.wind.speed} m/s
            </p>
            <p className="mt-4 font-semibold">
              {getClothingRecommendation(weather.main.temp)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
