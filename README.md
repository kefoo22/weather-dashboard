# 🌦 Weather Dashboard

A responsive, animated weather dashboard built with **React, Vite, Tailwind CSS, and Framer Motion**.  
It allows users to:

- Search weather conditions by city 🌍
- Detect weather automatically using **geolocation** 📍
- Shuffle through demo cities 🎲
- View clothing recommendations 👕🧥
- See animated error, loading, and weather states ✨

Deployed easily on platforms like **Vercel** or **Netlify**.

---

## ✨ Features

- **City Search**: Enter a city name to fetch real-time weather data.
- **Geolocation Detection**: Automatically fetches weather for the user’s current location (with permission).
- **Shuffle Demo City**: Try random cities without typing.
- **Weather Info**: Temperature, humidity, wind speed, and an icon.
- **Clothing Recommendations**: Get suggestions based on the temperature.
- **Error Handling**: Friendly animated error states instead of alerts.
- **Responsive UI**: Mobile-first design using Tailwind CSS.
- **Smooth Animations**: Powered by Framer Motion.

---

## 🛠 Tech Stack

- **React + Vite** — frontend framework and fast bundler
- **Tailwind CSS** — utility-first responsive styling
- **Framer Motion** — animations and transitions
- **Axios** — API requests
- **OpenWeatherMap API** — weather data provider

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
2. Install Dependencies
bash
Copy code
npm install
3. Set Up Environment Variables
Create a .env file in the root folder:

env
Copy code
VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
🔑 You can get a free API key from OpenWeatherMap.

4. Run Development Server
bash
Copy code
npm run dev
Open: http://localhost:5173

📱 Mobile First Design
The app is optimized for small screens:

Flexible search bar layout adapts between vertical (mobile) and horizontal (desktop).

Weather cards and buttons resize gracefully.

Tested on different viewport sizes.

🎯 Roadmap / Future Improvements
Add 5-day forecast view 📅

Dark mode toggle 🌙

Save favorite cities ⭐

Multi-language support 🌍

Improved clothing recommendations (wind chill, rain, etc.) 🧣

🤝 Contributing
Contributions are welcome!

Fork this repo

Create a feature branch (git checkout -b feat/amazing-feature)

Commit changes (git commit -m 'feat: add amazing feature')

Push to branch (git push origin feat/amazing-feature)

Open a Pull Request 🎉

📜 License
MIT License © 2025 [Your Name]