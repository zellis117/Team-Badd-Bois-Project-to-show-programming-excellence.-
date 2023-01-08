const router = require("express").Router();
const { State, Post, User } = require("../../models");

//Get all states

router.get("/", async (req, res) => {
    try {
      const result = await State.findAll({
        include:[
        {model: Post,
        },
      ]});
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
          include: {
            model:User
          }
        }]
      });
      if (result) {
        const state = result.get({plain: true});
      res.render('stateInfo', { 
        state, 
        loggedIn: req.session.logged_in,
       });
      };
      
     } catch (err) {
        res.json(err)
     }
  });

  module.exports = router