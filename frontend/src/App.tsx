import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<any>(null)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    if (!query.trim()) return

    setError('')
    setWeather(null)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/weather?city=${encodeURIComponent(query)}`
      )

      const data = await res.json()
      setWeather(data)
    } catch {
      setError('Unable to get weather data')
    }
  }

  return (
    <div className="app">
      <h1>WeatherTracker</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={fetchWeather}>
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.location.name}, {weather.location.region}
          </h2>

          <p>{weather.location.country}</p>

          <p>{weather.location.localtime}</p>

          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />

          <h3>{weather.current.temp_f}°F</h3>

          <p>{weather.current.condition.text}</p>
        </div>
      )}

      <p className="backend-note">
        If information is not loading, please wait for the backend server to start (~30 seconds).
      </p>
    </div>
  )
}

export default App