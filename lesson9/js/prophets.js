// Working with JSON.

const requestURL = "https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json" ;
const cards = document.querySelector( ".cards" ) ;

fetch( requestURL )
  .then( function ( response ) {
    return response.json() ;
  } )
  .then( function ( jsonObject ) {
    // console.table( jsonObject ) ;  // temporary checking for valid response and data parsing
    const prophets = jsonObject[ "prophets" ] ;
    prophets.forEach( displayProphets ) ;
  } ) ;

  function displayProphets( prophet ) {

    // Create elements to add to the document
    let card = document.createElement( "section" ) ;
    let h2 = document.createElement( "h2" ) ;
    let portrait = document.createElement( "img" ) ;
    let birthDate = document.createElement( "p" ) ;
    let birthPlace = document.createElement( "p" ) ;
    let order = "" ;

    // Choose correct letter to complete the order number.
    if ( prophet.order === 1 ) {
        order = `${prophet.order}st`
    } else if ( prophet.order === 2 ) {
        order = `${prophet.order}nd`
    } else if ( prophet.order === 3 ) {
        order = `${prophet.order}rd`
    } else {
        order = `${prophet.order}th`
    } ;
    
    // Change the textContent property of the h2 element to contain the prophet's full name
    h2.textContent = `${prophet.name} ${prophet.lastname}` ;

    // Change innerHTML property of the p elements.
    birthDate.innerHTML = `Date of Birth: ${prophet.birthdate}` ;
    birthPlace.innerHTML = `Birth Place: ${prophet.birthplace}` ;
  
    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    portrait.setAttribute( "src", prophet.imageurl ) ;
    portrait.setAttribute( "alt", `Portrait of ${prophet.name} ${prophet.lastname} - ${order} Latter-day President` ) ;
    portrait.setAttribute( "loading", "lazy" ) ;
  
    // Add/append the section(card) with the h2 element
    card.appendChild( h2 ) ;
    card.appendChild( birthDate ) ;
    card.appendChild( birthPlace ) ;
    card.appendChild( portrait ) ;
  
    // Add/append the existing HTML div with the cards class with the section(card)
    document.querySelector( "div.cards" ).appendChild( card ) ;
  }