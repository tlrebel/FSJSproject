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
function setPunchCard(data) {
  data = data || {};

  const card = {
    title: data.title || '',
    description: data.description || '',
    _id: data._id || '',
  };

  $('#numberID').val(card.title);
  $('#file-id').val(card._id);
}

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

  function editButton(id) {
  const clockTime = window.clockList.find(clockTime => clockTime._id === id);
  if (clockTime) {
   // clocking()
      setPunchCard(clockTime);
    
  }
}

function deleteButton(id) {
  if (confirm("This will be deleted. Okay?")) {
    deleteClock(id);
  }
}

function deleteClock(id) {
  $.ajax({
    type: 'DELETE',
    url: '/users/timestamps/' + id,
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("User and Date", id, "is Deleted.");
      refreshPunchList();
    })
    .fail(function(error) {
      console.log("Unable to delete", error);
    })
}

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
          
            // To display the date on website
            $("#timestamps").text(punchTime);
            // Sending the date and userInput to the backend.
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
}

// To place/show Edit and Delete to meet the requirement of (C.R.)U.D.--the last two parts.
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

function start(){
    clocking()     
}

function end(){
  clocking()
    
}

refreshPunchList();
