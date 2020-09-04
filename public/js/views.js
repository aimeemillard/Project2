$(document).ready(() => {
  // Getting a reference to the input field where user adds a new symptom
  const $newItemInput = $("input.new-item");
  // Our new symptom will go inside the symptomContainer
  const $symptomContainer = $(".symptom-container");
  // Adding event listeners for deleting, editing, and adding
  $(document).on("click", "button.delete", deleteSymptom);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".symptom-item", editSymptom);
  $(document).on("keyup", ".symptom-item", finishEdit);
  $(document).on("blur", ".symptom-item", cancelEdit);
  $(document).on("submit", "#symptom-form", insertSymptom);

  // Our initial symptom array
  const symptoms = [];

  // Getting symptom from database when page loads
  getSymptoms();

  // This function resets the symptom displayed with new symptom from the database
  function initializeRows() {
    $symptomContainer.empty();
    const rowsToAdd = [];
    for (const i = 0; i < symptoms.length; i++) {
      rowsToAdd.push(createNewRow(symptoms[i]));
    }
    $symptomContainer.prepend(rowsToAdd);
  }

  // This function grabs symptom from the database and updates the view
  function getSymptoms() {
    $.get("/api/symptoms", data => {
      symptoms = data;
      initializeRows();
    });
  }

  // This function deletes a symptom when the user clicks the delete button
  function deleteSymptom(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/symptoms/" + id,
    }).then(getSymptoms);
  }

  // This function handles showing the input box for a user to edit a symptom
  function editSymptom() {
    const currentSymptom = $(this).data("symptom");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentSymptom.text);
    $(this)
      .children("input.edit")
      .show();
    $(this)
      .children("input.edit")
      .focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    const symptom = $(this)
      .parent()
      .data("symptom");
    symptom.complete = !symptom.complete;
    updateSymptom(symptom);
  }

  // This function starts updating a symptom in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    const updatedSymptom = $(this).data("symptom");
    if (event.which === 13) {
      updatedSymptom.text = $(this)
        .children("input")
        .val()
        .trim();
      $(this).blur();
      updateSymptom(updatedSymptom);
    }
  }

  // This function updates a symptom in our database
  function updateSymptom(symptom) {
    $.ajax({
      method: "PUT",
      url: "/api/symptoms",
      data: symptom,
    }).then(getSymptoms);
  }

  // This function is called whenever a symptom item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    const currentSymptom = $(this).data("symptom");
    if (currentSymptom) {
      $(this)
        .children()
        .hide();
      $(this)
        .children("input.edit")
        .val(currentSymptom.text);
      $(this)
        .children("span")
        .show();
      $(this)
        .children("button")
        .show();
    }
  }

  // This function constructs a symptom-item row
  function createNewRow(symptom) {
    const $newInputRow = $(
      [
        "<li class='list-group-item symptom-item'>",
        "<span>",
        symptom.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>",
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", symptom.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("symptom", symptom);
    if (symptom.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new symptom into our database and then updates the view
  function insertSymptom(event) {
    event.preventDefault();
    const symptom = {
      text: $newItemInput.val().trim(),
      complete: false,
    };

    $.post("/api/symptoms", symptom, getSymptoms);
    $newItemInput.val("");
  }
});
