import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return; //Stops execution 
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        console.log(coords);

        fetchWeather(coords);
      },
      (error) => setError(error.message),
    );
  };

  const fetchWeather = async (searchQuery: string) => {
    if (!searchQuery.trim()) return; //Trims the query string to remove whitespace

    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        //Fetches the weather data from the API
        `${import.meta.env.VITE_API_URL}/weather?city=${encodeURIComponent(searchQuery)}`,
      );

      //Add response status check here 

      const data = await response.json(); //await is used to wait for the response json to be parsed
      setWeather(data);
    } catch {
      setError("Unable to get weather data");
    }
  };

  return (
    <div className="app">
      <h1>WeatherTracker</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} //Updates the query state when the input value is changed
        />

        <button onClick={() => fetchWeather(query)}>Search</button>
        <button onClick={getLocation}>Use My Location</button>
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
            alt={weather.current.condition.text} // Gets icon from the API 
          />

          <h3>{weather.current.temp_f}°F</h3>

          <p>{weather.current.condition.text}</p>
        </div>
      )}

      <p className="backend-note">
        If information is not loading, please wait for the backend server to
        start (~30 seconds).
      </p>
    </div>
  );
}

export default App;
