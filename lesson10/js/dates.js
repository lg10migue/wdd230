let currentDate = new Date() ;
let lastModification = document.lastModified ;

document.getElementById( "lastupdate" ).textContent = lastModification ;
document.querySelector( "#year" ).textContent = currentDate.getFullYear() ;