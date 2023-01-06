const User = require("./User");
const Post = require("./Post");
const State = require("./State");

Post.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Post, {
  foreignKey: "user_id",
});
Post.belongsTo(State, {
  foreignKey: "state_id",
});
State.hasMany(Post, {
  foreignKey: "state_id",
});
module.exports = { User, State, Post };
