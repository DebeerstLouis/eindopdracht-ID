
const calc_temp = temp => {
    celcius = temp - 273.15
    return celcius
}


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
    document.querySelector('.js-temperatuur').innerText = `${temperatuur}`;
    document.querySelector('.js-feels-like').innerText = `${feel_temp}`;
    document.querySelector('.js-Min-temp').innerText = `${min_temp}`;
    document.querySelector('.js-Max-temp').innerText = `${max_temp}`;
    document.querySelector('.js-humidity').innerText = `${humidity}`;
}

const getAPI = async (lat,lon) => {
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=4dc82a8db4261d0aaa945c76431fda04`)
    .then((r) => r.json())
    .catch((err) => console.error('Error: ', err))
    showData_celsius(data);
};


document.addEventListener('DOMContentLoaded', function(){
    console.log('Script ingeladen');
    getAPI(50.8868222, 3.4323622)
})