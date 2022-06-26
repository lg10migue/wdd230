// Select HTML elements in the document.
const currentTemp = document.querySelector( "#current-temp" ) ;
const weatherIcon = document.querySelector( "#weather-icon" ) ;
const captionDesc = document.querySelector( "figcaption" ) ;
const url = "https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=ec57731fa8997b218bc397f7a3d236e0" ;

apiFetch() ;

async function apiFetch() {
    try {
        const response = await fetch( url ) ;
        if ( response.ok ) {
            const data = await response.json() ;
            console.log( data ) ; // this is for testing the call
            displayResults( data ) ;
        } else {
            throw Error( await response.text() ) ;
        }
    } catch ( error ) {
        console.log( error ) ;
    }
}

function displayResults( weatherData ) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed( 0 )}</strong>` ;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png` ;
    let desc = weatherData.weather[0].description ;
    weatherIcon.setAttribute( "src", iconsrc ) ;
    weatherIcon.setAttribute( "alt", desc ) ;
    desc = desc.toLowerCase().replace( /\b[a-z]/g, UpperCase ) ;
    captionDesc.textContent = desc ;
}

function UpperCase( letter ) {
    return letter.toUpperCase() ;
}