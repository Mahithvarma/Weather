const cityname = document.getElementById('cityname');
const getbtn = document.getElementById('getbtn');

const city = document.querySelector('.city');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const desc = document.querySelector('.desc');
const emoji = document.querySelector('.emoji');

apikey = 'd8ae45ef68bbb247d8c2ac142b90c0d0';
let url = "";
getbtn.onclick = async function(){
    if(cityname.value){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname.value}&appid=${apikey}`;
        let response = await fetch(url);
        if(response.ok){
            let data = await response.json();
            displayData(data);
            // console.log(data);
        }
        else{
            Errormessage("City not found: " + cityname.value);
        }
    }
    else{
        Errormessage("Enter a valid City name");
    }
}


function Errormessage(message){
    alert(message);
}


function displayData(data){
    document.querySelector('.display').style.display = 'flex';
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp - 273) + "°C";
    humidity.innerHTML = "Humidity "+data.main.humidity + "%";
    desc.innerHTML = data.weather[0].description;
    // emoji.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon">`;

    let id = data.weather[0].id;
    if (id >= 200 && id < 300) {
        emoji.textContent = '⛈️';
    } else if (id >= 300 && id < 500) {
        emoji.textContent = '🌧️';
    } else if (id >= 500 && id < 600) {
        emoji.textContent = '☔';
    } else if (id >= 600 && id < 700) {
        emoji.textContent = '❄️';
    } else if (id >= 700 && id < 800) {
        emoji.textContent = '🌫️';
    } else if (id === 800) {
        emoji.textContent = '🌞';
    } else if (id > 800) {
        emoji.textContent = '☁️';
    }
}