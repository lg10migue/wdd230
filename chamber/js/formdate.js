// Datetime when the form was loaded.
let formDateElement = document.getElementsByName( "datetime" )[0] ;
let loadedDate = new Date().toLocaleString() ;

// Update the HTML element with the date value.
formDateElement.value = loadedDate ;