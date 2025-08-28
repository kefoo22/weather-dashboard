import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Fetch weather by city name
 */
export const fetchWeatherByCity = async (city) => {
  if (!API_KEY) {
    throw new Error("❌ Missing API key. Check your .env file!");
  }

  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return res.data;
  } catch (err) {
    if (err.response) {
      if (err.response.status === 401) {
        throw new Error("❌ Invalid API key. Please verify your .env setup.");
      }
      if (err.response.status === 404) {
        throw new Error("⚠️ City not found. Try again!");
      }
    }
    throw new Error("⚡ Something went wrong fetching weather data.");
  }
};

/**
 * Fetch weather by latitude & longitude (for geolocation)
 */
export const fetchWeatherByCoords = async (lat, lon) => {
  if (!API_KEY) {
    throw new Error("❌ Missing API key. Check your .env file!");
  }

  try {
    const res = await axios.get(BASE_URL, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
      },
    });
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error("❌ Invalid API key. Please verify your .env setup.");
    }
    throw new Error("⚡ Unable to fetch location weather.");
  }
};
