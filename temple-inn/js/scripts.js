// Dynamic Menu.

function toggleMenu() {
    document.getElementById( "primaryNav" ).classList.toggle( "open" ) ;
    document.getElementById( "hamburgerBtn" ).classList.toggle( "open" ) ;
    document.getElementById( "title" ).classList.toggle( "open" ) ;
    document.querySelector( "header img" ).classList.toggle( "open" ) ;
}

const x = document.getElementById( "hamburgerBtn" ) ;
x.onclick = toggleMenu ;

// Update last modified date.
let lastModification = document.lastModified ;
document.getElementById( "lastupdate" ).textContent = lastModification ;