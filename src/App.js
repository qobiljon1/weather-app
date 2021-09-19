import React, { useState } from "react";

const api = {
  key: "a1e489706d42cc8060cc0c8efc946aa6",
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const searchFunction = (e) => {
    if (e.keyCode === 13) {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };
  const dataNow = (d) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={weather.main.temp > 16 ? ("App hot") : "App"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-text"
            placeholder="Search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyUp={searchFunction}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{dataNow(new Date())}</div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
