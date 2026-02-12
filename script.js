async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return;

  const apiKey = "6cb092256c630dfa19d9a0ac9dc1ae61";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  document.getElementById("city").innerText = `City: ${data.name}`;
  document.getElementById("temp").innerText = `Temp: ${data.main.temp}°C`;
  document.getElementById("desc").innerText = `Weather: ${data.weather[0].description}`;
  document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").innerText = `Wind: ${data.wind.speed} m/s`;
  document.getElementById("pressure").innerText = `Pressure: ${data.main.pressure}`;
  document.getElementById("feels").innerText = `Feels like: ${data.main.feels_like}°C`;
}
