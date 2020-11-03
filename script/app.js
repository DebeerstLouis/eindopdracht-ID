
const calc_temp = temp => {
    celcius = temp - 273.15
    return celcius
}


const showData_celsius = data => {
    console.log(data)
    temp = data.main.temp ;
    console.log(calc_temp(temp));
    
    
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