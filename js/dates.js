let currentDate = new Date() ;
let lastModification = document.lastModified ;

document.getElementById( "lastupdate" ).textContent = lastModification ;
document.getElementById( "currentyear" ).textContent = currentDate.getFullYear() ;