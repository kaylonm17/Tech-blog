const router = require("express").Router();
const sequelize = require("../config/connection");
const { Tech, User, Comment } = require("../models");

// GET all techs for homepage
router.get("/", async (req, res) => {
  try {
    const dbtechData = await Tech.findAll({

      attributes: ["id", "location", "created_at", "tech_description"],
      include: [
        {
          model: Comment,
          attributes: ['id','user_id','tech_id','comment_text','created_at'],
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

    const techs = dbtechData.map((tech) => tech.get({ plain: true }));

    // ./views/homepage.handlebars ->
    // ./views/layouts/main.handlebars

    res.render('homepage', {
      techs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/tech/:id', (req, res) => {
  Tech.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'location', 'created_at', 'tech_description'],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "tech_id", "user_id", "created_at"],
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
  .then(dbtechData => {
    if (!dbtechData) {
      res.status(404).json({ message: 'No tech found with this id' });
      return;
    }

    // serialize the data
    const tech = dbtechData.get({ plain: true });

    // pass data to template
    res.render('single-tech', {tech, loggedIn: req.session.loggedIn});
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
