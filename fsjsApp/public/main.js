// To pull the data from server
function getTimestamp() {
  return $.ajax('/users/timestamps')
    .then(res => {
      console.log("Results from getTimestamp()", res);
      return res;
    })
    .fail(err => {
      console.error("Error in getTimestamp()", err);
      throw err;
    });
}

// To collect the data
function setPunchCard(data) {
  data = data || {};
  const card = {
    date: data.date || '',
    userId: data.userId || '',
    _id: data._id || '',
  };

  $('#numberID').val(card.userId);
  $('#data-id').val(card._id);
}

// To display the data on the website
function refreshPunchList() {
  const templatePunch = $('#punch-template').html();
  const compiledTemplate = Handlebars.compile(templatePunch);

  getTimestamp()
  .then(files => {
      window.clockList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#timestamps').html(html);
    })
}

// This is editing button
function editButton(id) {
    const clockTime = window.clockList.find(clockTime => clockTime._id === id);
    if (clockTime) {
        setPunchCard(clockTime);
   }
}

// this is deleting button--deleting the data
function deleteButton(id) {
  if (confirm("Are you sure you want to delete this? If so, press OK.")) {
      deleteClock(id);
  }
}

// Deleting data
function deleteClock(id) {
  $.ajax({
      type: 'DELETE',
      url: '/users/timestamps/' + id,
      dataType: 'json',
      contentType : 'application/json',
  })
  .done(function(response) {
      console.log("The data", id, "is Deleted.");
      refreshPunchList();
  })
  .fail(function(error) {
      console.log("Unable to delete", error);
  })
}

function clocking(type) {
    
    // To check the input from the user 
    var numbersUser = /^[0-9]+$/;
    
    // To get the values from the inputs
    var userInput = document.getElementById("numberID").value;
    var userData = document.getElementById("data-id").value;
    
        // Validation that the length and input of being numbers only are correct.
        if (isNaN(userInput) || userInput.length < 4) {
            alert("Please type only 4 numbers.");
            } else {
                
                // Setting the date of the time the button is clicked.
                var currentDate = new Date();
                var thisDay = (currentDate.getMonth()+ 1) + '-' + currentDate.getDate() + '-' + currentDate.getFullYear();
                var currentTime = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
                var punchTime = thisDay + ' ' + currentTime;
                alert("Your number is " + userInput + " and date of " + punchTime);
                                       
                // Sending the date and userInput to the backend.
                var method = 'POST';
                var url = '/users/timestamps/';
                if(userData) {
                    method = 'PUT';
                    url = '/users/timestamps/' + userData;
                }
                const ajaxSettings = {
                data: {
                    number: userInput,
                    type: type
                },
                method: method,
                //url: url,
                success: function (data, textStatus, jqXHR) {
                    console.log(data, textStatus, jqXHR)
                    }
                }
    $.ajax(url, ajaxSettings)      
  }
    //uncomment the line below if want to switch out the call from the bottom
 // refreshPunchList();  
}
function userBox() {
    var data = $('#data-id').val();
    if(data == '')
    {
        $('#numberID').val('');
    }
}

// To place/show Edit and Delete buttons.
function displayList() {
  const templateCard = $('#punch-template').html();
  const compiledTemplate = Handlebars.compile(templateCard);
    clocking()
    getTimestamp()
    .then(files => {
        window.fileList = files;
        const clockData = {files: files};
        const html = compiledTemplate(clockData);
        console.log(html);
        $('#timestamp').html(html);
    })
}

// Clock In button to start the whole thing
function start(){
    clocking('clock-in');     
}

// To make it look pretty.
function end(){
    //clocking('clock-out');
    alert("This feature is not yet implicated. Coming far away from you.");
}   

//uncomment the line below if wanting to show data from the beginning instead of after submitting the data.
refreshPunchList();
