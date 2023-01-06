const router = require("express").Router();
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const stateRoutes = require("./stateRoutes")

router.use("/post", postRoutes);
router.use("/user", userRoutes);
router.use("/state", stateRoutes);

module.exports = router;