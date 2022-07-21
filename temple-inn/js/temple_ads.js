// Globlal variables.

const requestURL = "json/temples.json"
const ads = document.querySelector( ".temple-ads picture img" ) ;
const title = document.querySelector( ".temple-information #temple-name" ) ;
const dedication = document.querySelector( ".temple-information #temple-dedication" ) ;
const leftButton = document.querySelector( ".temple-photo #left" ) ;
const rightButton = document.querySelector( ".temple-photo #right" ) ;

fetch ( requestURL )
    .then( function ( response ) {
        return response.json() ;
    } )
    .then( function ( jsonObject ) {
        const temples = jsonObject[ "temples" ] ;

        let temple = getRandomTemple( temples ) ;

        // Create temple ads
        displayTemple( temple ) ;

        leftButton.addEventListener( "click", function () {
            temple = changeTemple( left = true, temple, temples ) ;
        } ) ;

        rightButton.addEventListener( "click", function () {
            temple = changeTemple( left = false, temple, temples ) ;
        } ) ;
    } ) ;

function getRandomTemple( temples ) {
    const randomTemple = temples[  Math.floor( Math.random() * temples.length ) ] ;
    return randomTemple ;
} ;

function displayTemple( temple ) {
    ads.setAttribute( "src", temple.imgurlone ) ;
    title.textContent = temple.name ;
    dedication.textContent = temple.milestones[2] ;
} ;

function changeTemple( left, currentTemple, temples ) {
    let index ;
    let newTemple ;
    temples.forEach( temple => {
        if ( temple.name == currentTemple.name ) {
            index = temples.indexOf( temple ) ;
        } ; 
    } ) ;

    if ( left ) {
        index -= 1
    } else {
        index += 1
    } ;

    if ( index > temples.length - 1 ) {
        index = 0
    } else if ( index == -1 ) {
        index = temples.length - 1
    }
    newTemple = temples[index] ;
    displayTemple( newTemple ) ;
    return newTemple ;
}