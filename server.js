const express = require("express");
const sequelize = require("./config/connection");
const app = express();
const port = process.env.port || 3001;
const routes = require("./controllers");
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});

const session = require('express-session');
const sessionSequelize = require("connect-session-sequelize");
const sequelizeStore = sessionSequelize(session.Store)
const sessionOptions = {
  secret: "sessionsecret",
  cookie: {},
  resave: false,
  saveUnitialized: true,
  store: new sequelizeStore({
    db:sequelize
  })
}
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sessionOptions));
app.use(express.json());
app.use("/", routes);

sequelize.sync().then(() => {
  app.listen(port);
  console.log(`Server listening on port ${port}`);
});
