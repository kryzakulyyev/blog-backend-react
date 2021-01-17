const db = require("../models");
const BlogPost = db.blogpost;

// Create and Save a new BlogPost
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a BlogPost
  const blogpost = new BlogPost({
    title: req.body.title,
    completed: req.body.completed ? req.body.completed : false
  });

  // Save BlogPost in the database
  blogpost
    .save(blogpost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Blog Post."
      });
    });
};

// Retrieve all BlogPost from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  BlogPost.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving blog post."
      });
    });
};

// Find a single BlogPost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  BlogPost.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found BlogPost with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving BlogPost with id=" + id });
    });
};

// Update a BlogPost by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  BlogPost.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Blog Post with id=${id}. Maybe Todo Item was not found!`
        });
      } else res.send({ message: "Blog Post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Blog Post with id=" + id
      });
    });
};

// Delete a BlogPost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  BlogPost.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Blog Post with id=${id}. Maybe Todo Item was not found!`
        });
      } else {
        res.send({
          message: "Blog Post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Blog Post with id=" + id
      });
    });
};

// Delete all BlogPosts from the database.
exports.deleteAll = (req, res) => {
  BlogPost.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Blog Posts were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Blog Post."
      });
    });
};

// Find all completed BlogPost
exports.findAllCompleted = (req, res) => {
  BlogPost.find({ completed: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving BlogPost."
      });
    });
};