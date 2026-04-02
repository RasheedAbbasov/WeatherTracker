# 🌤️ WeatherTracker

A full-stack weather application that lets users search for real-time weather data by city. Built with a React + TypeScript frontend and a Spring Boot backend that proxies requests to the WeatherAPI.

**Live Demo:** [rasheedabbasov.github.io/WeatherTracker](https://rasheedabbasov.github.io/WeatherTracker)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite |
| Backend | Java Spring Boot |
| Weather Data | [WeatherAPI](https://www.weatherapi.com/) |
| Frontend Hosting | GitHub Pages |
| Backend Hosting | Render |

---

## Features

- Search current weather conditions by city name
- Displays temperature, weather conditions, and more
- Spring Boot backend proxies requests to WeatherAPI (keeps API key server-side)
- Deployed frontend + backend with environment-based configuration

---

## Project Structure

```
WeatherTracker/
├── frontend/          # React + TypeScript (Vite)
│   ├── src/
│   ├── .env.development
│   ├── .env.production
│   └── vite.config.ts
└── backend/           # Spring Boot
    ├── src/
    └── Dockerfile
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Java 17+
- Maven
- A free API key from [weatherapi.com](https://www.weatherapi.com/)

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Set your API key as an environment variable:
   ```bash
   export WEATHER_API_KEY=your_api_key_here
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will start at `http://localhost:8080`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.development` file:
   ```env
   VITE_API_URL=http://localhost:8080
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## Deployment

### Frontend → GitHub Pages

```bash
npm run deploy
```

The `vite.config.ts` base is set to `/WeatherTracker/` to match the GitHub Pages URL path.

### Backend → Render

The backend is containerized with Docker and deployed on Render. The `Dockerfile` uses `eclipse-temurin:17-jdk-alpine`.

Set the `WEATHER_API_KEY` environment variable in your Render service settings.

> **Tip:** The free tier of Render spins down after inactivity. Use [UptimeRobot](https://uptimerobot.com/) to ping the service periodically and prevent cold starts.

---

## Environment Variables

| Variable | Location | Description |
|----------|----------|-------------|
| `WEATHER_API_KEY` | Backend (server env) | Your WeatherAPI key |
| `VITE_API_URL` | Frontend `.env.*` | Base URL of the backend API |

---

## CORS

CORS is configured on the backend for:
- `http://localhost:5173` (local dev)
- `https://rasheedabbasov.github.io` (production)

If you deploy to a custom domain, update the `@CrossOrigin` annotation in the backend controller.

---

## License

This project is open source and available under the [MIT License](LICENSE).
