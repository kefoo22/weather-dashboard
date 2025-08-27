import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { fetchWeather } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);

  const handleSearch = async (city) => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch {
      alert("City not found. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
        🌦️ Weather Dashboard
      </h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherCard weather={weather} />
    </div>
  );
}

export default App;
