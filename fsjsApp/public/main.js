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

function clocking() {
    
    // To check the input from the user 
    var numbersUser = /^[0-9]+$/;
    var userInput = document.getElementById("numberID").value;
    
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
                const ajaxSettings = {
                data: {number: userInput},
                method: 'POST',
                success: function (data, textStatus, jqXHR) {
                console.log(data, textStatus, jqXHR)
                }
                $.ajax("/users/timestamps/", ajaxSettings)      
            } 
        
        if (fileData._id) {
            method = 'PUT';
            url = '/users/timestamps/' + fileData._id;
            } else {
                method = 'POST';
                url = '/users/timestamps/';
            }   
        }
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
    clocking()     
}

// To make it look pretty.
function end(){
  alert("This feature is not yet implicated. Coming far away from you.");
    
}

//uncomment the line below if wanting to show data from the beginning instead of after submitting the data.
//refreshPunchList();
