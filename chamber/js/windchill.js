// Get values from page.
let temperature = parseFloat( document.getElementById( "temperature" ).innerHTML ) ;
let windSpeed = parseFloat( document.getElementById( "wind-speed" ).innerHTML ) ;

// Transform temperature to Fahrenheit.
let temperatureToFahrenheit = ( temperature * 1.8 ) + 32 ;

// Transform wind speed to Miles per hour.
let windSpeedToMPH = windSpeed / 1.609 ;

if ( ( temperatureToFahrenheit <= 50 ) && ( windSpeedToMPH > 3 ) ) {
    windChill = 35.74 + ( 0.6215 * temperatureToFahrenheit ) - ( 35.75 * ( windSpeedToMPH ** 0.16 ) ) + ( 0.4275 * temperatureToFahrenheit * ( windSpeedToMPH ** 0.16 ) ) ;
    windChillToCelsius = ( windChill - 32 ) / 1.8 ;
    let windChillElement = document.getElementById( "wind-chill" ) ;
    windChillElement.innerHTML = windChillToCelsius.toFixed( 2 ) ;
} ;
