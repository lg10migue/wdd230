// Lazy load.
const images = document.querySelectorAll( "[data-src]" ) ;

// Pre load images.
function preloadImage( img ) {
	const scr = img.getAttribute( "data-src" ) ;
	img.src = scr ;
}

// Options for imageObserver.
const imageOptions = {
	threshold: 1,
	rootMargin: "0px 0px -150px 0px",
} ;

// Function observer.
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
images.forEach( ( image ) => {
    imageObserver.observe( image ) ;
} ) ;