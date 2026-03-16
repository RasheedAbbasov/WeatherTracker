import { useState } from 'react'
import './App.css'

interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    localtime: string
  }
  current: {
    temp_f: number
    temp_c: number
    condition: {
      text: string
      icon: string
    }
  }
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/weather?city=${encodeURIComponent(query)}`
      )
      if (!res.ok) throw new Error('Location not found')
      const data: WeatherData = await res.json()
      setWeather(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') fetchWeather()
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
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeather} disabled={loading}>
          {loading ? '...' : 'Search'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.location.name}, {weather.location.region}</h2>
          <p className="country">{weather.location.country}</p>
          <p className="datetime">{weather.location.localtime}</p>
          <div className="temp-row">
            <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            <span className="temp">{weather.current.temp_f}°F</span>
          </div>
          <p className="condition">{weather.current.condition.text}</p>
        </div>
      )}
    </div>
  )
}

export default App