/* global moment */

// When user clicks add-btn
$("#blog-submit").on("click", event => {
  event.preventDefault();

  // Make a newChirp object
  const newChirp = {
    author: $("#author")
      .val()
      .trim(),
    body: $("#blog-box")
      .val()
      .trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newChirp);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newChirp)
    // On success, run the following code
    .then(() => {
      const row = $("<div>");
      row.addClass("chirp");

      row.append("<p>" + newChirp.author + " chirped: </p>");
      row.append("<p>" + newChirp.body + "</p>");
      row.append(
        "<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>"
      );

      $("#blog-area").prepend(row);
    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#blog-box").val("");
});

// When the page loads, grab all of our chirps
$.get("/api/all", data => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      const row = $("<div>");
      row.addClass("blog");

      row.append("<p>" + data[i].author + " chirped.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append(
        "<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>"
      );

      $("#blog-area").prepend(row);
    }
  }
});
