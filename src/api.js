import axios from "axios";

const weatherApiBase = "https://api.openweathermap.org/data/2.5/";
const suggestionsApiBase = "https://spott.p.rapidapi.com/places/autocomplete";
const suggestionsApiKey = "e4d4507831msh8daf27e079eeb5cp15df2ejsn008380f9d487";
const geocodeApiBase = "https://api.opencagedata.com/geocode/v1/json";
const geocodeApiKey = "a8e8db5883f242d38f4cc76e3b594ebd";
const weatherApiKey = "cda3f386e741b1e8c36187206ab43cfd";

export async function fetchSuggestions(query) {
  try {
    const response = await axios.get(`${suggestionsApiBase}`, {
      params: {
        limit: "5",
        skip: "0",
        q: query,
        type: "CITY",
      },
      headers: {
        "X-RapidAPI-Key": suggestionsApiKey,
        "X-RapidAPI-Host": "spott.p.rapidapi.com",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchWeatherData(geometry) {
  try {
    const response = await axios.get(
      `${weatherApiBase}weather?lat=${geometry.lat}&lon=${geometry.lng}&units=metric&appid=${weatherApiKey}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchGeocodeData(search) {
  try {
    const response = await axios.get(
      `${geocodeApiBase}?q=${search}&key=${geocodeApiKey}`
    );
    return response.data.results[0]?.geometry;
  } catch (error) {
    console.error(error);
    return null;
  }
}
