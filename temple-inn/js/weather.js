// Select HTML elements in the document.
const days =  [ "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun", "Mon", "Tues", "Wed", "Thur" ];
const d = new Date();
const currentTemp = document.querySelector( "#temperature" ) ;
const weatherIcon = document.querySelector( "#weather-icon" ) ;
const weatherDescription = document.querySelector( "#weather-description" ) ;
const humidity = document.querySelector( "#humidity" ) ;
const weatherCards = document.querySelector( ".forecast" ) ;
const url = "https://api.openweathermap.org/data/2.5/onecall?lat=31.7333300&lon=-106.4833300&exclude=minutely,hourly&units=metric&appid=ec57731fa8997b218bc397f7a3d236e0" ;
apiFetch() ;

async function apiFetch() {
    try {
        const response = await fetch( url ) ;
        if ( response.ok ) {
            const data = await response.json() ;
            // console.log( data ) ; // this is for testing the call
            displayResults( data ) ;
            for ( let i = 0; i < 4; i++ ) {
                forecastWeather( data, i ) ;
            } ;
        } else {
            throw Error( await response.text() ) ;
        }
    } catch ( error ) {
        console.log( error ) ;
    }
}

function displayResults( weatherData ) {
    
    // Get current temperature.
    let currentTemperature = weatherData.current.temp

    // Get weather icon.
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.current.weather[0].icon}.png` ;

    // Capitalize each word of weather description.
    let desc = weatherData.current.weather[0].description.toLowerCase().replace( /\b[a-z]/g, UpperCase ) ;

    // Get Wind Speed in meters per second and transform it to kilometers per hour.
    let humidityData = ( weatherData.current.humidity ) ; 

    currentTemp.innerHTML = `<strong>${currentTemperature.toFixed( 0 )}</strong>` ;
    weatherIcon.setAttribute( "src", iconsrc ) ;
    weatherIcon.setAttribute( "alt", desc ) ;
    humidity.textContent = humidityData ;
    weatherDescription.textContent = desc ;

}

function UpperCase( letter ) {
    return letter.toUpperCase() ;
}

// Forecast weather.
function forecastWeather( weatherData, day ) {
    let forecast_icon = `https://openweathermap.org/img/w/${weatherData.daily[day].weather[0].icon}.png` ;
    let forecast = document.createElement( "section" ) ;
    let day_tag = document.createElement( "h2" ) ;
    let day_icon = document.createElement( "img" ) ;
    let day_data = document.createElement( "p" ) ;

    day_icon.setAttribute('src', `${forecast_icon}`);
    day_icon.setAttribute('alt', 'weather icon');
    day_icon.setAttribute('loading', 'lazy');
    let weekDay = days[d.getDay() + day];
    day_tag.innerHTML = `${weekDay}`;
    day_data.innerHTML = `High: ${Math.round(weatherData.daily[day].temp.max)}&deg C<br/> 
    Low: ${Math.round(weatherData.daily[day].temp.min)}&deg C`

    forecast.appendChild(day_tag);      
    forecast.appendChild(day_icon);
    forecast.appendChild(day_data);

    weatherCards.appendChild(forecast);
} ;