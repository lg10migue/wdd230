const requestURL = "json/data.json" ;
const companiesElement = document.querySelector( "#companies" ) ;
const spotlightOne = document.querySelector( "#spot1" ) ;
const spotlightTwo = document.querySelector( "#spot2" ) ;
const spotlightThree = document.querySelector( "#spot3" ) ;

fetch( requestURL )
  .then( function ( response ) {
    return response.json() ;
  } )
  .then( function ( jsonObject ) {
    // console.table( jsonObject ) ;  // temporary checking for valid response and data parsing
    const companies = jsonObject[ "companies" ] ;
    
    // Clean data to only keep gold or silver companies.
    getCompanies( companies ) ;

    // Get random companies.
    let goldCompanyOne = getRandomCompany( companies, "Gold Membership" ) ;
    let goldCompanyTwo = getRandomCompany( companies, "Gold Membership" ) ;
    let silverCompanyOne = getRandomCompany( companies, "Silver Membership" ) ;

    // Avoid post same gold company twice.
    while ( goldCompanyOne.name == goldCompanyTwo.name ) {
        goldCompanyTwo = getRandomCompany( companies, "Gold Membership" ) ;
    } ; 

    // Create spotlights.
    displaySpotlight( goldCompanyOne, spotlightOne ) ;
    displaySpotlight( goldCompanyTwo, spotlightTwo ) ;
    displaySpotlight( silverCompanyOne, spotlightThree ) ;
  } ) ;  


function getCompanies( companies ) {
    companies.forEach( company => {
        // If company is not Gold or Silver, erase from data.
        if ( company.membership == "NP Membership" || company.membership == "Bronze Membership" ) {

            // Get index of company.
            let index = companies.indexOf( company ) ;

            // Erase company from data by index.
            companies.splice( index, 1 ) ;
        } ;
    } ) ;
} ;

function getRandomCompany( companies, membership ) {
    // First, get all companies from same membership.
    let memberships = [] ;
    companies.forEach( company => {
        if ( company.membership == membership ) {
            memberships.push( company )
        } ;
    } ) ;

    // Choose one random company from array.
    const randomCompany = memberships[ Math.floor( Math.random() * memberships.length ) ] ;
    return randomCompany ;
} ;

function displaySpotlight( company, spotlight ) {

    // Get children elements.
    let title = spotlight.children[0] ;
    let img = spotlight.children[1] ;
    let spot = spotlight.children[2] ;
    let website = spotlight.children[4] ;
    let tel = spotlight.children[5] ;

    // Fill elements with spot info.
    title.textContent = company.name ;
    img.setAttribute( "src", company.imageurl ) ;
    img.setAttribute( "alt", `${company.name} Logo` ) ;
    spot.textContent = company.spot ;
    website.textContent = company.website ;
    website.setAttribute( "href", company.website ) ;
    tel.textContent = company.phone ;
} ;