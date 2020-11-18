// --Hulpmiddels voor het omrekenen van gegevens--
const calc_temp = temp => {
    celcius = temp - 273.15
    result=Math.round(celcius*100)/100
    return result
}
const calc_farenheigt =  temp=> {
    fahrenheit = (temp - 273.15)* 1.8000 + 32.00
    result=Math.round(fahrenheit*100)/100
    return result
}
var calc_wind = function(deg){
    if (deg>11.25 && deg<33.75){
      return "NNE";
    }else if (deg>33.75 && deg<56.25){
      return "ENE";
    }else if (deg>56.25 && deg<78.75){
      return "E";
    }else if (deg>78.75 && deg<101.25){
      return "ESE";
    }else if (deg>101.25 && deg<123.75){
      return "ESE";
    }else if (deg>123.75 && deg<146.25){
      return "SE";
    }else if (deg>146.25 && deg<168.75){
      return "SSE";
    }else if (deg>168.75 && deg<191.25){
      return "S";
    }else if (deg>191.25 && deg<213.75){
      return "SSW";
    }else if (deg>213.75 && deg<236.25){
      return "SW";
    }else if (deg>236.25 && deg<258.75){
      return "WSW";
    }else if (deg>258.75 && deg<281.25){
      return "W";
    }else if (deg>281.25 && deg<303.75){
      return "WNW";
    }else if (deg>303.75 && deg<326.25){
      return "NW";
    }else if (deg>326.25 && deg<348.75){
      return "NNW";
    }else{
      return "N"; 
    }
  }
// --
// --Data dat wordt getoont--
const showData_celsius = data => {
    //console.log(data)
    temp = data.main.temp;
    feel = data.main.feels_like
    min = data.main.temp_min
    max = data.main.temp_max
    humidity = data.main.humidity
    temperatuur = calc_temp(temp)
    feel_temp = calc_temp(feel)
    min_temp = calc_temp(min)
    max_temp = calc_temp(max)
    document.querySelector('.js-temperatuur').innerText = `${temperatuur}°C`;
    document.querySelector('.js-Min-Max-feelslike').innerText = `Max ${max_temp}°  Min ${min_temp}°  Feels like ${feel_temp}°`;
    document.querySelector('.js-humidity').innerText = `${humidity}%`;
}
const showData_farenheigt = data => {
    //console.log(data)
    temp = data.main.temp;
    feel = data.main.feels_like
    min = data.main.temp_min
    max = data.main.temp_max
    humidity = data.main.humidity
    temperatuur = calc_farenheigt(temp)
    feel_temp = calc_farenheigt(feel)
    min_temp = calc_farenheigt(min)
    max_temp = calc_farenheigt(max)
    document.querySelector('.js-temperatuur').innerText = `${temperatuur}°F`;
    document.querySelector('.js-Min-Max-feelslike').innerText = `Max ${max_temp}°  Min ${min_temp}°  Feels like ${feel_temp}°`;
    document.querySelector('.js-humidity').innerText = `${humidity}%`;
}
const showData_Wind_and_pressure = data => {
    console.log(data)
    pressure = data.main.pressure
    windspeed = data.wind.speed
    winddir = data.wind.deg
    windname = calc_wind(winddir)
    windspeed_convert = windspeed * 3.6
    result=Math.round(windspeed_convert*100)/100
    //console.log(windspeed_convert)
    document.querySelector('.js-Windspeed').innerText = `${result} KM/u`;
    document.querySelector('.js-direction').innerText = `${windname}`;
    document.querySelector('.js-pressure').innerText = `${pressure} pha`
}
const showData_location_icon = data => {
    Locatie = data.name;
    //description = data.weather
    document.querySelector('.js-locatie').innerText = `${Locatie}`;
    //document.querySelector('.js-icondescription').innerText = `${description}`;
    const d = new Date();
    buddy =  d.toUTCString()
    document.querySelector('.js-currentdata').innerText = `${buddy}`;
}
// --
// --data ophalen ++ controleren op toggle switch ++ huidige locatie opvragen--
const getAPI = async (position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=4dc82a8db4261d0aaa945c76431fda04`)
    .then((r) => r.json())
    .catch((err) => console.error('Error: ', err))
    showData_Wind_and_pressure(data);
    showData_location_icon(data);
    showData_celsius(data);
    // controleren op de toggle switch voor celsius naar fahrenheit
    var checkbox = document.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
        showData_farenheigt(data)
        // console.log('Checked');
        } else {
        showData_celsius(data);
        // console.log('Not checked');
        };
    });
};

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getAPI);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
}
// --




document.addEventListener('DOMContentLoaded', function(){
    console.log('Script ingeladen');
    getLocation();
    // getAPI(50.8868222, 3.4323622)
})