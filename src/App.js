import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const api = {
  key: "cda3f386e741b1e8c36187206ab43cfd",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [geocode, setGeocode] = useState({});
  const [weather, setWeather] = useState({});
  const [render, setRender] = useState(true);

  const buttonPressed = () => {
    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=a8e8db5883f242d38f4cc76e3b594ebd`
    )
      .then((res) => res.json())
      .then((result) => {
        setGeocode(result.results[0]?.geometry);
        fetchWeatherData(result.results[0]?.geometry);
      })
      .catch((error) => console.error(error));
  };

  const fetchWeatherData = (geometry) => {
    fetch(
      `${api.base}weather?lat=${geometry.lat}&lon=${geometry.lng}&units=metric&appid=${api.key}`
    )
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setRender(false);
      })
      .catch((error) => console.error(error));
  };
  
  function Weatherdata() {
    return (
      <>
        <div className="max-w-md mx-auto bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md rounded-md p-4 mt-10">
          <h2 className="text-2xl font-bold mb-2 text-white">{weather.name}</h2>
          <p className="text-lg text-white mb-4">
            Temperature: {weather.main.temp}°C
          </p>
          <p className="text-lg text-white mb-4">
            Weather: {weather.weather[0].main}
          </p>
          <p className="text-lg text-white mb-4">
            Description: {weather.weather[0].description}
          </p>
        </div>
      </>
    );
  }
  
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-purple-400 to-indigo-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-yellow-400 sm:text-6xl">
              Weather App
            </h1>
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 mt-12 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter City/Town ..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className="mt-10 flex items-center justify-center gap-x-6"
              onClick={buttonPressed}
            >
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
            </div>
            {render ? null : <Weatherdata />}
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-400 to-indigo-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
  
}
