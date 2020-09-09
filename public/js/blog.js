$(document).ready(() => {
  $("#blog-submit").on("click", event => {
    event.preventDefault();
    alert("Your responce has been saved successfully!!");
    $.ajax({
      method: "GET",
      url: "/api/blog1"
    }).then(alert("success"));
  });
});
