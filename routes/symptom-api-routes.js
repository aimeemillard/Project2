/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  app.get("/api/todos", function(req, res) {
    db.Todo.findAll({}).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // POST route for saving a new item
  app.post("/api/todos", function(req, res) {
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete,
    })
      .then(function(dbTodo) {
        res.json(dbTodo);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // DELETE route for deleting.
  app.delete("/api/todos/:id", function(req, res) {
    db.Todo.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });
  });

  // PUT route for updating.
  app.put("/api/todos", function(req, res) {
    db.Todo.update(
      {
        text: req.body.text,
        complete: req.body.complete,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then(function(dbTodo) {
        res.json(dbTodo);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};
