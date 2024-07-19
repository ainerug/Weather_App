import React, { useEffect, useState } from "react";
import Clock from "react-live-clock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDroplet, faEyeLowVision, faTemperature0, faWind } from "@fortawesome/free-solid-svg-icons";

export default function Forecast() {
  const [forecast, setForecast] = useState({});
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    if (city !== "") {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&id=524901&units=metric&appid=3e43c3d8b684e8223c23a336c725a765`
      );
      const data = await response.json();
      console.log(data);
      setForecast(data);
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&id=524901&units=metric&appid=3e43c3d8b684e8223c23a336c725a765`
          );
          const data = await response.json();
          setForecast(data);
          setLoading(false);
        },
        (e) => {
          alert("Location Services Were Denied");
        }
      );
    }
  };

  useEffect(() => {
    getData();
  }, [city]);

  const searchCity = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value);
    }
  };

  return (
    <div className="w-screen h-[100vh] flex justify-center items-center">
      {/*Main DIV*/}
      {loading === false ? (
        <>
          <div className=" w-[60%] h-[550px] flex main-container">
            {/*Left container*/}
            <div className=" flex  flex-col  justify-between left-side-div w-[65%] h-full rounded-xl shadow-md shadow-white brightness-100 left-container">
              {/*Left TOP*/}
              <div className="flex flex-col items-end px-5 py-3 left-top">
                <h1 className="text-[45px]   text-white  font-semibold pt-5 cityName ">
                  {forecast.name}
                </h1>
                <h3 className="text-white text-[25px] font-semibold countryName">
                  {forecast.sys?.country}
                </h3>
              </div>
              {/*Container's bottom*/}
              <div className="flex justify-between pb-8 px-8 left-bottom">
                <div className="flex flex-col">
                  <h1 className="text-white text-[30px] font-semibold cityTime">
                    <Clock
                      format={"HH:mm:ss"}
                      ticking={true}
                      timezone={"Europe/Lisbon"}
                    />
                  </h1>
                  <p className="text-white text-[30px] font-semibold cityDate">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                {/*Right bottom*/}
                <div>
                  <h1 className="pt-8 text-white text-[40px] font-semibold cityTemp">
                    {Math.round(forecast.main?.temp)}°C
                  </h1>
                </div>
              </div>
            </div>

            {/*Right side*/}
            <div className="bg-black bg-opacity-55 w-[35%] h-full rounded-xl shadow-md shadow-white px-4 right-container">
              <div>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather?.[0]?.icon}@4x.png`}
                  alt="icon"
                  width={180}
                  className="m-auto right-side-icon"
                />
              </div>
              <div className="flex justify-between items-center px-3">
                <h1 className="text-white text-[35px] font-semibold right-side-text">
                  {forecast.weather?.[0]?.main}
                </h1>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather?.[0]?.icon}@2x.png`}
                  alt="weatherIcon"
                  width={50}
                />
              </div>
              <div className="text-center">
                <input
                  onKeyDown={(e) => {
                    searchCity(e);
                  }}
                  type="text"
                  name="search"
                  placeholder="Search..."
                  className="w-[80%] h-[40px] bg-transparent border-b-2 text-white text-[16px]"
                />
              </div>
              <div className="text-center py-3">
                <p className="text-white font-semibold">
                  {forecast.weather?.[0]?.description}
                </p>
              </div>
              <hr />
              <div className="flex justify-between items-center px-2 py-3">
                <h3 className="text-white font-semibold"><FontAwesomeIcon icon={faTemperature0} /> Feels like</h3>
                <h3 className="text-white font-semibold">
                  {Math.round(forecast.main?.feels_like)}°C
                </h3>
              </div>
              <hr />
              <div className="flex justify-between items-center px-2 py-3">
                <h3 className="text-white font-semibold"><FontAwesomeIcon icon={faEyeLowVision} /> Visibility</h3>
                <h3 className="text-white font-semibold">
                  {forecast.visibility}
                </h3>
              </div>
              <hr />
              <div className="flex justify-between items-center px-2 py-3">
                <h3 className="text-white font-semibold"> <FontAwesomeIcon icon={faDroplet} /> Humidity</h3>
                <h3 className="text-white font-semibold">
                  {forecast.main?.humidity}%
                </h3>
              </div>
              <hr />
              <div className="flex justify-between items-center px-2 py-3">
                <h3 className="text-white font-semibold"><FontAwesomeIcon icon={faWind} /> Wind Speed</h3>
                <h3 className="text-white font-semibold">
                  {Math.round(forecast.wind?.speed)} Km/h
                </h3>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-white text-[40px] font-semibold">
            <h1>Loading...</h1>
          </div>
        </>
      )}
    </div>
  );
}
