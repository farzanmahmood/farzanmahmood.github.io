// Prompt for user's name and display it in the output paragraph
function nameFunction() {
    let userName = prompt("Please enter your name:");
    if (userName) {
      document.getElementById("output").textContent = "Hello, " + userName + "!";
    } else {
      document.getElementById("output").textContent = "You didn't enter a name!";
    }
  };
  
  // Make the image clickable and enlarge when clicked

  const image = document.getElementById("clickableImage");

  // Toggle the image size when clicked
  image.addEventListener("click", function() {
    // Check if the image is in its enlarged state
    if (this.style.width === "300px" || this.style.width === "") {
      this.style.width = "600px"; // Enlarge the image
    } else {
      this.style.width = "300px"; // Revert back to original size
    }
  });

  
  // Highlight function for nav items (onmouseover)
  function highlight(element) {
    element.style.backgroundColor = "lightgray";
  }
  
  // Unhighlight function for nav items (onmouseout)
  function unhighlight(element) {
    element.style.backgroundColor = "";
  }