// Create three variables that hold references to the input, button, and list elements using const.
const inputElement = document.querySelector( "input" ) ;
const buttonElement = document.querySelector( "button" ) ;
const listElement = document.querySelector( "ul" ) ;

// Create an click event listener for the Add Chapter button using addEventListener and an anonymous function.
buttonElement.addEventListener( "click", function() {
    if ( inputElement.value != "" ) {
        // Create an li element.
        let newChapter = document.createElement( "li" ) ;

        // Create a delete button.
        let deleteButton = document.createElement( "button" ) ;

        // Populate the li elements textContent or innerHTML with the input.
        newChapter.textContent = inputElement.value ;

        // Populate the button textContent with an ❌.
        deleteButton.textContent = "❌" ;

        // Append the li element with the delete button.
        newChapter.append( deleteButton ) ;

        // Append the list element with the li element just created and appended with text and the delete button.
        listElement.append( newChapter ) ;

        // Add an event listener to the delete button that removes the li element when clicked.
        deleteButton.addEventListener( "click", function() {
            listElement.removeChild( newChapter ) ;

            // Send the focus to the input element.
            inputElement.focus() ;
        } ) ;
        
        // Clean up the successful add of a chapter by changing the input to nothing or the empty string and setting the focus to the input.
        inputElement.value = "" ;
        inputElement.focus() ;
    }
} ) ;