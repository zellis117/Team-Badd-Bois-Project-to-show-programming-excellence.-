const router = require("express").Router();
const { State, Post } = require("../../models");

//Get all states with posts

router.get("/", async (req, res) => {
    try {
        //TODO: include posts with each state
      const result = await State.findAll();
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
        include: [{"model":Post}]
      });
      if (result) {
        const state = result.get({ plain: true });
        res.status(200).json(state);
      }
     } catch (err) {
        res.status(500).json(err)
     }
  });

  module.exports = router