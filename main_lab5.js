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
function picFunction() {
    this.style.width = this.style.width === "200px" ? "400px" : "200px"; // Toggles between two sizes
  };

  
  // Highlight function for nav items (onmouseover)
  function highlight(element) {
    element.style.backgroundColor = "lightgray";
  }
  
  // Unhighlight function for nav items (onmouseout)
  function unhighlight(element) {
    element.style.backgroundColor = "";
  }