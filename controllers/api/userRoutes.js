const router = require("express").Router();
const { User } = require("../../models");

//Create new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//User login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userData = await User.findOne({
      where: { username: username },
    });
    if (!userData) {
      res
        .status(400)
        .json({ message: "User not found" });
      return;
    } else {
      if (userData.checkPassword(password)) {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ message: "Successfully logged in"})
      } else {
        res.json({ message: "Incorrect Password"})
      }
    }
});

//User logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end('logged out!');
    });
  } else {
    res.status(404).end('already logged out!');
  }
});
//Retrieve user by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await User.findByPk(req.params.id);
    if (result) {
      const user = result.get({ plain: true });
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Retrieve all users
router.get("/", async (req, res) => {
  try {
    const result = await User.findAll();
    const users = result.map((user) => {
      return user.get({ plain: true });
    });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
