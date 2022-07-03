// Select HTML elements in the document.
const currentTemp = document.querySelector( "#temperature" ) ;
const weatherIcon = document.querySelector( "#weather-icon" ) ;
const weatherDescription = document.querySelector( "#weather-description" ) ;
const windSpeed = document.querySelector( "#wind-speed" ) ;
const windChill = document.querySelector( "#wind-chill" ) ;
const url = "https://api.openweathermap.org/data/2.5/weather?id=4013708&units=metric&appid=ec57731fa8997b218bc397f7a3d236e0" ;

apiFetch() ;

async function apiFetch() {
    try {
        const response = await fetch( url ) ;
        if ( response.ok ) {
            const data = await response.json() ;
            // console.log( data ) ; // this is for testing the call
            displayResults( data ) ;
        } else {
            throw Error( await response.text() ) ;
        }
    } catch ( error ) {
        console.log( error ) ;
    }
}

function displayResults( weatherData ) {
    
    // Get current temperature.
    let currentTemperature = weatherData.main.temp

    // Get weather icon.
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` ;

    // Capitalize each word of weather description.
    let desc = weatherData.weather[0].description.toLowerCase().replace( /\b[a-z]/g, UpperCase ) ;

    // Get Wind Speed in meters per second and transform it to kilometers per hour.
    let windSpeedData = ( weatherData.wind.speed * 3.6 ).toFixed( 2 ) ; 

    currentTemp.innerHTML = `<strong>${currentTemperature.toFixed( 0 )}</strong>` ;
    weatherIcon.setAttribute( "src", iconsrc ) ;
    weatherIcon.setAttribute( "alt", desc ) ;
    windSpeed.textContent = windSpeedData ;
    weatherDescription.textContent = desc ;

    // Condition to check if Wind Chill needs to be calculated.
    if ( ( currentTemperature <= 10 ) && ( windSpeedData > 4.8 ) ) {

        // Transform temperature to Fahrenheit.
        let tempToFahrenheit = ( currentTemperature * 1.8 ) + 32 ;

        // Transform Wind Speed to miles per hour.
        let windSpeedToMPH = windSpeedData / 1.609 ;

        // Calculate Wind Chill.
        let windChillFahrenheit = 35.74 + ( 0.6215 * tempToFahrenheit ) - ( 35.75 * ( windSpeedToMPH ** 0.16 ) ) + ( 0.4275 * tempToFahrenheit * ( windSpeedToMPH ** 0.16 ) ) ;

        // Transform Wind Child Fahrenheit to Celsius.
        let windChillToCelsius = ( windChillFahrenheit - 32 ) / 1.8 ;
        windChill.innerHTML = `${windChillToCelsius.toFixed( 2 )} km/h` ;
    } else {
        windChill.innerHTML = "N/A" ;
    } ;

}

function UpperCase( letter ) {
    return letter.toUpperCase() ;
}