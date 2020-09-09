/* global moment */

// When user clicks add-btn
$("#blog-submit").on("click", event => {
  event.preventDefault();

  // Make a newPost object
  const newPost = {
    author: $("#author")
      .val()
      .trim(),
    body: $("#blog-box")
      .val()
      .trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newPost);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newPost)
    // On success, run the following code
    .then(() => {
      const row = $("<div>");
      row.addClass("post");

      row.append("<p>" + newPost.author + " Posted: </p>");
      row.append("<p>" + newPost.body + "</p>");
      row.append(
        "<p>At " + moment(newPost.created_at).format("h:mma on dddd") + "</p>"
      );

      $("#blog-area").prepend(row);
    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#blog-box").val("");
});

// When the page loads, grab all of our Posts
$.get("/api/all", data => {
  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      const row = $("<div>");
      row.addClass("blog");

      row.append("<p>" + data[i].author + " Posted.. </p>");
      row.append("<p>" + data[i].body + "</p>");
      row.append(
        "<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>"
      );

      $("#blog-area").prepend(row);
    }
  }
});
