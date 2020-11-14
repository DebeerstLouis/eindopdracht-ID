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
    document.querySelector('.js-temperatuur').innerText = `${temperatuur} °C`;
    document.querySelector('.js-feels-like').innerText = `${feel_temp} °C`;
    document.querySelector('.js-Min-temp').innerText = `${min_temp} °C`;
    document.querySelector('.js-Max-temp').innerText = `${max_temp} °C`;
    document.querySelector('.js-humidity').innerText = `${humidity} %`;
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
    document.querySelector('.js-temperatuur').innerText = `${temperatuur} °F`;
    document.querySelector('.js-feels-like').innerText = `${feel_temp} °F`;
    document.querySelector('.js-Min-temp').innerText = `${min_temp} °F`;
    document.querySelector('.js-Max-temp').innerText = `${max_temp} °F`;
    document.querySelector('.js-humidity').innerText = `${humidity} %`;
}
const showData_Wind = data => {
    console.log(data)
    windspeed = data.wind.speed
    windspeed_convert = windspeed * 3.6
    result=Math.round(windspeed_convert*100)/100
    //console.log(windspeed_convert)
    document.querySelector('.js-Windspeed').innerText = `${result} KM/u`;
}
// --
// --data ophalen ++ controleren op toggle switch ++ huidige locatie opvragen--
const getAPI = async (position) => {
    lat = position.coords.latitude
    lon = position.coords.longitude
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=4dc82a8db4261d0aaa945c76431fda04`)
    .then((r) => r.json())
    .catch((err) => console.error('Error: ', err))
    showData_Wind(data);
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