
$(document).ready(function () {
  searchCovid()
  $("#search-button").on("click", function () {
    var searchValue = $("#search-value").val();

    // clear input box
    $("#search-value").val("");
    //Search Value is the City name
    searchCovid(searchValue);
  });

  function searchCovid(searchValue) {
    $.ajax({
      type: "GET",
      url:
        "https://api.covidtracking.com" +
        "/v1/us/current.json",
        
      dataType: "json", 
      success: function (data) {
      console.log(data)
       
      }
    });
  }
});
