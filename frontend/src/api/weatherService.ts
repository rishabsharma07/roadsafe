const API_KEY = '931dc78e3ef1dc43627bf14e3afcb92e';


export async function fetchWeather(
  lat: number,
  lon: number
) {

  try {

    const response = await fetch(

      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const data = await response.json();
    console.log(data);

    const weatherMain =
      data.weather[0].main.toLowerCase();

      console.log(
        "Weather Main:",
          weatherMain
      );


    if (
  weatherMain.includes('rain') ||
  weatherMain.includes('drizzle') ||
  weatherMain.includes('thunderstorm')
) {

  return 'Raining no high winds';
}


if (
  weatherMain.includes('snow')
) {

  return 'Snowing no high winds';
}


if (

  weatherMain.includes('fog') ||

  weatherMain.includes('mist') ||

  weatherMain.includes('haze') ||

  weatherMain.includes('smoke')
) {

  return 'Fog or mist';
}


if (

  weatherMain.includes('clear') ||

  weatherMain.includes('cloud')
) {

  return 'Fine no high winds';
}


return 'Other';

  } catch (error) {

    console.error(error);

    return 'Fine no high winds';
  }
}