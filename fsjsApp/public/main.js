function clocking() {
    //TODO refresh the page after the user click ok when they see their number and timestamp on page.
      // To check the input from the user 
        var numbersUser = /^[0-9]+$/;
        var userInput = document.getElementById("numberID").value;
    
            // Validation that the length and input of being numbers only are correct.
            if (isNaN(userInput) || userInput.length < 7) {
                alert("Please type only 7 numbers.");
            } else {
                
        // Setting the date of the time the button is clicked.
        var currentDate = new Date();
        var thisDay = (currentDate.getMonth()+ 1) + '-' + currentDate.getDate() + '-' + currentDate.getFullYear();
        var currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
        var punchTime = thisDay + ' ' + currentTime;
                $("#timestamps").text(punchTime);
            // Sending the userInput to the backend.
             const ajaxSettings = {
                data: {number: userInput},
                method: 'POST',
                success: function (data, textStatus, jqXHR) {
                    console.log(data, textStatus, jqXHR)
                   $("#timestamps").html(data)
                }
            }
            $.ajax("/users/timestamps", ajaxSettings)      
        }  
    alert("clockCheck = " +clockCheck);
}
var clockCheck = false;

function start(){
   //TODO validate the user number is correct before setting the clockCheck
    clockCheck= true;
    //
    clocking()
   
            
      
}

function end(){
    //TODO validate the user number is correct before setting the clockCheck
    clockCheck = false;
  clocking()
    
}

