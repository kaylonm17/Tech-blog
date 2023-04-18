const router = require("express").Router();
const sequelize = require("../config/connection");
const { Trip, User, Comment } = require("../models/Index");

// GET all trips for homepage
router.get("/", async (req, res) => {
  try {
    const dbTripData = await Trip.findAll({

      attributes: ["id", "location", "created_at", "trip_description"],
      include: [
        {
          model: Comment,
          attributes: ['id','user_id','trip_id','comment_text','created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const trips = dbTripData.map((trip) => trip.get({ plain: true }));

    // ./views/homepage.handlebars ->
    // ./views/layouts/main.handlebars

    res.render('homepage', {
      trips,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/trip/:id', (req, res) => {
  Trip.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'location', 'created_at', 'trip_description'],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "trip_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbTripData => {
    if (!dbTripData) {
      res.status(404).json({ message: 'No trip found with this id' });
      return;
    }

    // serialize the data
    const trip = dbTripData.get({ plain: true });

    // pass data to template
    res.render('single-trip', {trip, loggedIn: req.session.loggedIn});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Signup route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Otherwise, render the 'signup' template
  res.render('signup');
});

module.exports = router;
