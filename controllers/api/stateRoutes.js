const router = require("express").Router();
const { State, Post } = require("../../models");

//Get all states

router.get("/", async (req, res) => {
    try {
      const result = await State.findAll({include:[{"model": Post}]});
      const states = result.map((state) => {
        return state.get({ plain: true });
      });
      res.json(states);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//Get state by ID with posts

router.get("/:id", async (req, res) => {
     try {
      const result = await State.findByPk(req.params.id, {
        include: [{
          model:Post,
          attributes: [
            "id",
            "user_id",
            "post_text"
          ]
        }]
      });
      if (result) {
        const state = result.get({plain: true});
        const posts = result.posts.map((post) => post.get({ plain: true }));
      res.render('stateInfo', { state });
      };
      
     } catch (err) {
        res.status(500).json(err)
     }
  });

  module.exports = router