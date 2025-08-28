import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: import.meta.env.VITE_WEATHER_API_KEY,
        units: "metric", // Celsius
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("City not found!");
  }
};
