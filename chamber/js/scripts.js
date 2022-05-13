// Dates

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
] ;

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
] ;

let currentDate = new Date() ;
let lastModification = document.lastModified ;
let day = currentDate.getDay() ;
let dayName = days[ day ] ;
let month = months[ currentDate.getMonth() ] ;
let year = currentDate.getFullYear() ;

document.getElementById( "lastupdate" ).textContent = lastModification ;
document.getElementById( "year" ).textContent = year ;
document.getElementById( "date" ).textContent = `${dayName}, ${day} ${month} ${year}`

// Dynamic Menu

function toggleMenu() {
    document.getElementById( "primaryNav" ).classList.toggle( "open" )
    document.getElementById( "hamburgerBtn" ).classList.toggle( "open" )
}

const x = document.getElementById( "hamburgerBtn" )
x.onclick = toggleMenu ;