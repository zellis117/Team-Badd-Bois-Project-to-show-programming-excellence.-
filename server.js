const express = require("express");
const sequelize = require("./config/connection");
const app = express();
const port = process.env.port || 3001;
const routes = require("./controllers");
app.use(express.json());
app.use(routes);

sequelize.sync().then(() => {
  app.listen(port);
  console.log(`Server listening on port ${port}`);
});
