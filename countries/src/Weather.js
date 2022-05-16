import { useEffect, useState } from "react";

const Weather = ({ capital }) => {
  const [weatherCapital, setWeather] = useState(false);
  useEffect(async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setWeather(json);
      console.log(json);
    } else console.log(`fetch error code: ${response.status}`);
  }, []);
  if (weatherCapital) {
    return (
      <div>
        <h4>Weather in {capital}</h4>
        <p>temperature {weatherCapital.main.temp} Celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`}
          alt={weatherCapital.weather[0].description}
        />
        <p>wind {weatherCapital.wind.speed} m/s</p>
      </div>
    );
  };
};

export default Weather;