const body = document.querySelector("body");
const author = document.getElementById("author");
const currency = document.getElementById("currency");
const weather = document.querySelector(".weather-container");

const API_KEY = "51627edbd30cdee472c8996108e936b7"

fetch("https://apis.scrimba.com/unsplash/photos/black-and-white-whale-in-water-dyu466BfWj8")
    .then(res => res.json())
    .then(data => {
        body.style.backgroundImage = `url(${data.urls.full})`;
        author.textContent = `photo by ${data.user.name}`;
    })
    .catch(err => {
        console.log("Something went wrong.");
        body.style.backgroundColor = "gray";
        author.textContent = "Something went wrong. Cannot upload background image."
    });

fetch("https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=try")
    .then(res => {
        if(!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        currency.textContent = `$1 = ₺${data.usd.try}`;
    })
    .catch(err => currency.textContent = err);

function updateTime() {
    const now = new Date();
    document.querySelector(".time-container").textContent = now.toLocaleTimeString();
}

setInterval(updateTime, 1000);

updateTime();

navigator.geolocation.getCurrentPosition((position) => {
    coords = {
        lat: position.coords.latitude,
        long: position.coords.longitude
    }
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric`)
    .then(res => res.json())
    .then(data => {
        weather.innerHTML = `
        <div id="weather-main">
            <p>${data.name}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather-icon";
        </div>
        <div id="weather-temps">
            <p>current temp.: ${Math.round(data.main.temp)}º</p>
            <p>feels like: ${Math.round(data.main.feels_like)}º</p>
        </div>
        `;
    })
  })

  