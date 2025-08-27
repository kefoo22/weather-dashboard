function WeatherCard({ weather }) {
  if (!weather) return null;

  const { name, main, wind, weather: details } = weather;
  const { temp, humidity } = main;
  const { speed } = wind;
  const { icon, description } = details[0];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto"
      />
      <p className="text-xl font-semibold">{temp}°C</p>
      <p className="capitalize text-gray-500">{description}</p>
      <div className="flex justify-around mt-4 text-sm">
        <p>💧 Humidity: {humidity}%</p>
        <p>💨 Wind: {speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;
