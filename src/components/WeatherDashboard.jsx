import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0); // 🔑 force re-render on shuffle

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const demoCities = ["London", "Tokyo", "New York", "Paris", "Johannesburg"];

  // 🌍 Auto-detect user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            setLoading(true);
            setError("");
            const res = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            setWeather(res.data);
          } catch {
            handleGeolocationFallback();
          } finally {
            setLoading(false);
          }
        },
        () => {
          handleGeolocationFallback();
        }
      );
    } else {
      handleGeolocationFallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🎲 Shuffle demo city with animation
  const handleGeolocationFallback = async () => {
    const randomCity = demoCities[Math.floor(Math.random() * demoCities.length)];
    try {
      setLoading(true);
      setError("📍 Using demo city since location is blocked or unavailable");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${randomCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setShuffleKey((prev) => prev + 1); // 🔑 trigger animation re-render
    } catch {
      setError("⚠️ Could not load demo city weather either.");
    } finally {
      setLoading(false);
    }
  };

  // 🔎 Search city manually
  const fetchWeather = async () => {
    if (!city) return;
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setShuffleKey((prev) => prev + 1); // 🔑 trigger animation re-render
    } catch {
      setError("⚠️ City not found. Try again!");
    } finally {
      setLoading(false);
    }
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
    <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        🌦 Weather Dashboard
      </h1>

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row w-full max-w-sm gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow p-3 rounded-lg text-black outline-none"
        />
        <button
          onClick={fetchWeather}
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
            className="p-4 bg-red-500 text-white rounded-lg shadow-md w-full max-w-sm text-center mb-4"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Weather Card with shuffle animation */}
      <AnimatePresence mode="wait">
        {weather && (
          <motion.div
            key={shuffleKey} // 🔑 ensures re-animation on shuffle
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-xl w-full max-w-sm text-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{weather.name}</h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto"
            />
            <p className="text-base sm:text-lg">
              🌡 {weather.main.temp}°C | 💧 {weather.main.humidity}% | 🌬{" "}
              {weather.wind.speed} m/s
            </p>
            <p className="mt-4 font-semibold">
              {getClothingRecommendation(weather.main.temp)}
            </p>

            {/* Shuffle button under card */}
            <button
              onClick={handleGeolocationFallback}
              className="mt-6 bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              🎲 Shuffle Demo City
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state with Shuffle */}
      {!weather && !loading && !error && (
        <div className="text-center mt-6 space-y-4">
          <p className="opacity-90">
            🔍 Enter a city above or 🎲 Shuffle demo city to see the weather!
          </p>
          <button
            onClick={handleGeolocationFallback}
            className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            🎲 Shuffle Demo City
          </button>
        </div>
      )}
    </div>
  );
}
