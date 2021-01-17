module.exports = app => {
  const blogposts = require("../controllers/blogpost.controller");

  var router = require("express").Router();

  // Create a new  blog post
  // router.post("/", blogposts.create);

  // Retrieve all blog post
  router.get("/", blogposts.findAll);

  // Retrieve all completed  blog post
  // router.get("/completed", blogposts.findAllCompleted);

  // // Retrieve a single  blog post with id
  // router.get("/:id", blogposts.findOne);

  // // Update a  blog post with id
  // router.put("/:id", blogposts.update);

  // // Delete a  blog post with id
  // router.delete("/:id", blogposts.delete);

  // // Delete all  blog post
  // router.delete("/", blogposts.deleteAll);

  app.use('/api/blogposts', router);
};