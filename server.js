const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// Multer
const multer = require('multer')
const bodyparser = require('body-parser')

// Initializes Sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const { strict } = require('assert');
const routes = require('./controllers/Index');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up session and connect to our Sequelize db
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    // maxAge seets the maximum age for the cookie to be valid. Here, the cookie (and session) will expire after one hour. 
    maxAge: 10 * 60 * 1000, // expires after 10 min
    // If it is an http only cookie, this mean client side javascript can't access it.
    httpOnly: true,
    // secure tells express-session to only initialize session cookies when the protocol being used is HTTPS. Having this set to true, and running a server without encryption will result in the cookies not showing up in your developer console.
    secure: false,
    // sameSite tells express-session to only initialize session cookies when the referrer provided by the client matches the domain out server is hosted from.
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  // Sets up session store
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// This is just for multer image uploading, may not be necessary
// doesn't break anything on its own so I'm going to leave it for now - riley
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(routes); // call ./controllers/index.js

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});
