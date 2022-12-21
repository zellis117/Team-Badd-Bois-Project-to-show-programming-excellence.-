const User = require('./User');
const Post = require('./Post.js');

Post.belongsTo(User);
User.hasMany(Post);

module.exports = {User, Post}