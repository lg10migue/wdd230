// Get data.
const requestURL = "json/temples.json" ;
const companiesElement = document.querySelector( ".temples" ) ;

fetch( requestURL )
  .then( function ( response ) {
    return response.json() ;
  } )
  .then( function ( jsonObject ) {
    // console.table( jsonObject ) ;  // temporary checking for valid response and data parsing
    const temples = jsonObject[ "temples" ] ;
    temples.forEach( displayTemples ) ;
    let likedButtons = document.getElementsByClassName( "heart" ) ;
    likedButtons = Array.from( likedButtons ) ;
    likedButtons.forEach( button => {
      checkLike( button ) ;
      button.addEventListener( "click", () => {
        like( button ) ;
      } ) ;
    } ) ;
  } ) ;

function displayTemples( temple ) {
    let templeSection = document.createElement( "section" ) ;
    let name = document.createElement( "h3" ) ;
    let photo = document.createElement( "img" ) ;
    let servicesTitle = document.createElement( "p" ) ;
    let services = document.createElement( "ol" ) ;
    let address = document.createElement( "p" ) ;
    let phone = document.createElement( "p" ) ;
    let email = document.createElement( "p" ) ;
    let milestonesTitle = document.createElement( "p" ) ;
    let milestones = document.createElement( "ol" ) ;
    let likeButton = document.createElement( "div" ) ;

    name.innerHTML = temple.name ;
    address.innerHTML = temple.address ;
    phone.innerHTML = temple.phone ;
    email.innerHTML = temple.email ;
    servicesTitle.innerHTML = "<b>Services</b>" ;
    servicesTitle.setAttribute( "class", "list-title" ) ;
    milestonesTitle.innerHTML = "<b>Temple History</b>" ;
    milestonesTitle.setAttribute( "class", "list-title" ) ;

    // Create photo.
    photo.setAttribute( "src", temple.imgurltwo ) ;
    photo.setAttribute( "alt", `Photo of ${temple.name}` ) ;

    // Like button.
    likeButton.setAttribute( "class", "heart" ) ;
    likeButton.setAttribute( "id", temple.name ) ;

    // Add services available.
    temple.services.forEach( ( service ) => {
      let li = document.createElement( "li" ) ;
      li.innerHTML = service ;
      services.appendChild( li ) ;
    } ) ;

    // Add milestones.
    temple.milestones.forEach( ( milestone ) => {
      let li = document.createElement( "li" ) ;
      li.innerHTML = milestone ;
      milestones.appendChild( li ) ;
    } ) ;

    templeSection.appendChild( name ) ;
    templeSection.appendChild( photo ) ;
    templeSection.appendChild( servicesTitle ) ;
    templeSection.appendChild( services ) ;
    templeSection.appendChild( address ) ;
    templeSection.appendChild( phone ) ;
    templeSection.appendChild( email ) ;
    templeSection.appendChild( milestonesTitle ) ;
    templeSection.appendChild( milestones ) ;
    templeSection.appendChild( likeButton ) ;
    
    // Create temple card.
    companiesElement.appendChild( templeSection ) ;
}

// Keep or remove like.
function like( button ) {
  // Toggle class.
  button.classList.toggle( "is-active" ) ;
  if ( localStorage.getItem( `like-${button.id}` ) ) {
    localStorage.removeItem( `like-${button.id}` ) ;
  } else {
    populateLike( button ) ;
  } ;
} ;

// Add like to localStorage.
function populateLike( button ) {
  localStorage.setItem( `like-${button.id}`, button ) ;
} ;


// Check for like in localStorage.
function checkLike( button ) {
  if ( localStorage.getItem( `like-${button.id}` ) ) {
    // Toggle class.
    button.classList.toggle( "is-active" ) ;
  } ;
} ;