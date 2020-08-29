$( document ).ready(function() {
function displayStateInfo() {

var queryURL = "url: 'https://api.covidtracking.com/v1/us/current.json";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  $("#state-view").text(JSON.stringify(response));
});
}

});










//function newFunction() {
  //  return $.ajax({
    //    type: "GET",
    //  url: 'https://api.covidtracking.com/v1/us/current.json',
    //    data: { name: (i) },
    //    success: function (data) {
    //        alert(data);
    //    }
   // });
// }
