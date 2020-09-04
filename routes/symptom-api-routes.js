// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our symptom model
const db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the symptoms
  app.get("/api/symptoms", (req, res) => {
    // findAll returns all entries for a table when used with no options
    db.Symptom.findAll({}).then(dbSymptom => {
      // We have access to the symptoms as an argument inside of the callback function
      res.json(dbSymptom);
    });
  });

  // POST route for saving a new sympton
  app.post("/api/symptoms", (req, res) => {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Symptom.create({
      text: req.body.text,
      complete: req.body.complete,
    }).then(dbSymptom => {
      // We have access to the new symptom as an argument inside of the callback function
      res.json(dbSymptom);
    });
  });

  // DELETE route for deleting symptoms. We can get the id of the symptom we want to delete from
  // req.params.id
  app.delete("/api/symptoms/:id", (req, res) => {
    // We just have to specify which symptom we want to destroy with "where"
    db.Symptom.destroy({
      where: {
        id: req.params.id,
      },
    }).then(dbSymptom => {
      res.json(dbSymptom);
    });
  });

  // PUT route for updating symptoms. We can get the updated symptom from req.body
  app.put("/api/symptoms", (req, res) => {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Symptom.update(
      {
        text: req.body.text,
        complete: req.body.complete,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(dbSymptom => {
      res.json(dbSymptom);
    });
  });
};
