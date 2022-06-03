// Lazy load.
const images = document.querySelectorAll( "img[data-src]" ) ;

// Pre load images.
function preloadImage( img ) {
	img.setAttribute( "src", img.getAttribute( "data-src" ) ) ;
	img.onload = () => {
        img.removeAttribute( "data-src" ) ;
    }
}

// Options for imageObserver.
const imageOptions = {
	threshold: 0,
	rootMargin: "0px 0px 100px 0px",
} ;

// Function observer.
if( "IntersectionObserver" in window ) {
    const imageObserver = new IntersectionObserver( ( items, imageObserver ) => {
        items.forEach( (item ) => {
            if ( !item.isIntersecting ) {
                return ;
            } else {
                preloadImage( item.target ) ;
                imageObserver.unobserve( item.target ) ;
            }
        } ) ;
    }, imageOptions ) ;

    // Loop in all the images and load if necessary.
    images.forEach(( image ) => {
        imageObserver.observe( image ) ;
    } ) ;

} else {
    images.forEach( ( image ) => {
      preloadImage( image ) ;
    } ) ;
 
}

// Footer

let currentDate = new Date() ;
let lastModification = document.lastModified ;

document.getElementById( "lastupdate" ).textContent = lastModification ;
document.querySelector( "span" ).textContent = currentDate.getFullYear() ;