const requestURL = "json/data.json" ;
const companiesElement = document.querySelector( "#companies" ) ;

fetch( requestURL )
  .then( function ( response ) {
    return response.json() ;
  } )
  .then( function ( jsonObject ) {
    // console.table( jsonObject ) ;  // temporary checking for valid response and data parsing
    const companies = jsonObject[ "companies" ] ;
    companies.forEach( displayCompanies ) ;
  } ) ;


// Function to create companies section.
  function displayCompanies( company ) {
    let companySection = document.createElement( "section" ) ;
    let name = document.createElement( "h3" ) ;
    let logo = document.createElement( "img" ) ;
    let address = document.createElement( "p" ) ;
    let phone = document.createElement( "p" ) ;
    let website = document.createElement( "a" ) ;

    // Fill the HTML elements with the info.
    name.innerHTML = company.name ;
    address.innerHTML = company.address ;
    phone.innerHTML = company.phone ;
    website.innerHTML = company.website ;
    website.setAttribute( "href", company.website ) ;

    // Create the logo.
    logo.setAttribute( "src", company.imageurl ) ;
    logo.setAttribute( "alt", `Logo of ${company.name}` ) ;
    logo.setAttribute( "loading", "lazy" ) ;

    // Append the HTML elements.
    companySection.appendChild( name ) ;
    companySection.appendChild( logo ) ;
    companySection.appendChild( address ) ;
    companySection.appendChild( phone ) ;
    companySection.appendChild( website ) ;

    // Append the companySection to the HTML document.
    companiesElement.appendChild( companySection ) ;
}

// Grid or List buttons.
const gridButton = document.querySelector( "#grid" ) ;
const listButton = document.querySelector( "#list" ) ;


gridButton.addEventListener( "click", () => {
	companiesElement.classList.add( "directory-grid" ) ;
	companiesElement.classList.remove( "directory-list" ) ;
} ) ;

listButton.addEventListener( "click", () => {
	companiesElement.classList.add( "directory-list" ) ;
	companiesElement.classList.remove( "directory-grid" ) ;
} ) ;