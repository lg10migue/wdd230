// Globlal variables.

const requestURL = "json/temples.json"
const ads = document.querySelector( ".temple-ads picture img" ) ;
const title = document.querySelector( ".temple-information #temple-name" ) ;
const dedication = document.querySelector( ".temple-information #temple-dedication" ) ;
const leftButton = document.querySelector( ".temple-photo #left" ) ;
const rightButton = document.querySelector( ".temple-photo #right" ) ;
let latitude ;
let longitude ;

// Select HTML elements in the document.
const alertButton = document.querySelector( ".weather-alert button" ) ;
const alertElement = document.querySelector( ".weather-alert" ) ;
const alertName = document.querySelector( ".weather-alert #alert-name" ) ;
const alertDesc = document.querySelector( ".weather-alert #description" ) ;
const days =  [ "Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun", "Mon", "Tues", "Wed", "Thur" ];
const d = new Date();
const currentTemp = document.querySelector( "#temperature" ) ;
const weatherIcon = document.querySelector( "#weather-icon" ) ;
const weatherDescription = document.querySelector( "#weather-description" ) ;
const humidity = document.querySelector( "#humidity" ) ;
const weatherCards = document.querySelector( ".forecast" ) ;

fetch ( requestURL )
    .then( function ( response ) {
        return response.json() ;
    } )
    .then( function ( jsonObject ) {
        const temples = jsonObject[ "temples" ] ;

        let temple = getRandomTemple( temples ) ;

        // Create temple ads
        displayTemple( temple ) ;

        leftButton.addEventListener( "click", function () {
            temple = changeTemple( left = true, temple, temples ) ;
        } ) ;

        rightButton.addEventListener( "click", function () {
            temple = changeTemple( left = false, temple, temples ) ;
        } ) ;
    } ) ;

function getRandomTemple( temples ) {
    const randomTemple = temples[  Math.floor( Math.random() * temples.length ) ] ;
    return randomTemple ;
} ;

function displayTemple( temple ) {
    ads.setAttribute( "src", temple.imgurlone ) ;
    title.textContent = temple.name ;
    dedication.textContent = temple.milestones[2] ;
    latitude = temple.latitude ;
    longitude = temple.longitude ;

    apiFetch() ;

} ;

function changeTemple( left, currentTemple, temples ) {
    let index ;
    let newTemple ;
    temples.forEach( temple => {
        if ( temple.name == currentTemple.name ) {
            index = temples.indexOf( temple ) ;
        } ; 
    } ) ;

    if ( left ) {
        index -= 1
    } else {
        index += 1
    } ;

    if ( index > temples.length - 1 ) {
        index = 0
    } else if ( index == -1 ) {
        index = temples.length - 1
    }
    newTemple = temples[index] ;
    displayTemple( newTemple ) ;
    return newTemple ;
}

async function apiFetch() {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=ec57731fa8997b218bc397f7a3d236e0` ;
    try {
        const response = await fetch( url ) ;
        if ( response.ok ) {
            const data = await response.json() ;
            // console.log( data ) ; // this is for testing the call

            // Current weather.
            displayResults( data ) ;

            // Avoid duplicated cards.
            deleteChild() ;

            // Forecast weather.
            for ( let i = 0; i < 4; i++ ) {
                forecastWeather( data, i ) ;
            } ;

            // Weather alert.
            weatherAlert( data ) ;

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
    let weekDay = days[d.getDay() + day];
    day_tag.innerHTML = `${weekDay}`;
    day_data.innerHTML = `High: ${Math.round(weatherData.daily[day].temp.max)}&deg C<br/> 
    Low: ${Math.round(weatherData.daily[day].temp.min)}&deg C`

    forecast.appendChild( day_tag ) ;
    forecast.appendChild( day_icon ) ;
    forecast.appendChild( day_data ) ;

    weatherCards.appendChild( forecast ) ;
} ;

function deleteChild () {
    let child = weatherCards.lastElementChild ;
    while ( child ) {
        weatherCards.removeChild( child ) ;
        child = weatherCards.lastElementChild ;
    }
}

function weatherAlert( weatherData ) {
    if ( weatherData.alerts ) {
        alertElement.classList.remove( "close" ) ;
        alertName.textContent = weatherData.alerts[0].event ;
        alertDesc.textContent = weatherData.alerts[0].description ;
    }
}

function toggleMenu() {
    alertElement.classList.toggle( "close" ) ;
} ;

// Close weather alert!
alertButton.onclick = toggleMenu ;