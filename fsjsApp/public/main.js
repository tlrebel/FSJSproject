function start(){
    
            var numbersUser = /^[0-9]+$/;
          
            var userInput = document.getElementById("numberID").value;
            console.log(numbersUser.value);
            if (isNaN(userInput) || userInput.length < 7) {
                alert("Please type only 7 numbers.");
            } else {
                alert("You have clocked in.");
            }
        
}

function end(){
  alert("This works");
}