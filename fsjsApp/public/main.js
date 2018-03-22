function start(){
    
    function numbersOnly(inputField) {
            var numbersUser = /^[0-9]+$/;
          
            var input = isNaN(numbersUser.value);
            if (inputField.value.match(numbers)) {
                alert("You have clocked in.");
            } else {
                alert("Please type only 7 numbers.");
            }
        }
}

function end(){
  alert("This works");
}