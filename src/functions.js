import { uid } from "uid";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const timeAPIKey = import.meta.env.VITE_API_KEY_TZ;

// const imageSource = ref("./src/assets/images/drizzle.jpg");

// function setBackground(weatherCode, ) {
//   if ([300, 301, 302].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/drizzle.jpg";
//   } else if ([500, 501, 502, 511, 520, 521, 522].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/rain.jpg";
//   } else if ([600, 601, 602, 610, 611, 612, 621, 622, 623].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/snow.jpg";
//   } else if ([700, 711, 721, 731, 741, 751].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/fog.jpg";
//   } else if ([800, 801].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/sunny.jpg";
//   } else if ([802, 803].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/clouds.jpg";
//   } else if ([804].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/heavy-clouds.jpg";
//   } else if ([200, 201, 202, 230, 231, 232, 233].includes(weatherCode)) {
//     imageSource.value = "./src/assets/images/thunder.jpg";
//   } else {
//     imageSource.value = "./src/assets/images/clouds-undefined.jpg";
//   }

// return imageSource
// }

export function addUIDToDays(days) {
  days.forEach(day => {
    day.id = uid();
  });
  return days;
}

async function fetchTimeData(time, timeZone) {
  try {
    let url = `https://api.ipgeolocation.io/timezone/convert`;

    const response = await axios.get(url, {
      params: {
        tz_from: "UTC",
        tz_to: timeZone,
        time,
        apiKey: timeAPIKey,
      },
    });
    return response.data;
  } catch (e) {
    isError.value = true;
    return e.message;
  }
}

export {fetchTimeData}

async function fetchWeatherForecast(city, lat, lon) {
  try {
    const response = await axios.get("https://api.weatherbit.io/v2.0/forecast/daily", {
      params: {
        lang: "ru",
        city,
        key: apiKey,
        lat,
        lon,
        days: 7,
      },
    });
    return response.data.data;
  } catch (e) {
    isError.value = true
    return e.message
  }
}

export {fetchWeatherForecast}

async function fetchWeatherCurrentData(city, lat, lon) {
  try {
    const response = await axios.get("https://api.weatherbit.io/v2.0/current", {
      params: {
        lang: "ru",
        city,
        key: apiKey,
        lat,
        lon,
      },
    });
    return response.data.data[0];
  } catch (e) {
    isError.value = true;
    return e.message;
  }
}

export {fetchWeatherCurrentData}

