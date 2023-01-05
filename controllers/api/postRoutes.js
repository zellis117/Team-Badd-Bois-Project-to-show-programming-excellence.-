const router = require("express").Router();
const { Post } = require("../../models");

//Create post
router.post("/", async (req, res) => {
    try {
      const dbUserData = await Post.create(req.body);
      res.status(200).json(dbUserData);
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
//Get all posts
router.get("/", async (req, res) => {
    try {
        const result = await Post.findAll()
        const posts = result.map((post) => {
           return post.get({ plain: true })
        });
        res.json(posts)
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete post
router.delete('/:id', async (req, res) => {
  try {
    const result = await Post.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!result) {
      res.status(404).json({message: "Post not found"})
    } else {
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router