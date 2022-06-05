// Days between visits.

// Get todays timestamp.
const today = Date.now() ;
const lastVisitElement = document.getElementById( "days-between" ) ;

// Get last visit timestamp.
if ( localStorage.getItem( "last_visit" ) ) {

    // If variable exists, calculate days between visits.
    const last_visit = Number( localStorage.getItem( "last_visit" ) ) ;
    const timeBetween = Math.round( ( ( ( today - last_visit ) / 1000 ) / 3600 ) / 24 ) ;
    lastVisitElement.innerHTML = `Days since your last visit: ${timeBetween}.`

    storeLastVisit( today )

} else {

    // If not, create new variable and store timestamp for last visit.
    storeLastVisit( today ) ;
} ;

function storeLastVisit( timestamp ) {
    localStorage.setItem( "last_visit", timestamp )
} ;