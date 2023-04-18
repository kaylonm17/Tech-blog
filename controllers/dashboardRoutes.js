const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Trip, Comment } = require('../models/Index');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbTripData = await Trip.findAll({
      where: {user_id: req.session.user_id}, // use the ID from the session
      attributes:['id','title','location','trip_description','starting_date','ending_date','created_at'],
      order: [['created_at','DESC']],
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
          attributes: ['username']
        }
      ],
    });
  
    const trips = dbTripData.map((trip) =>
      trip.get({ plain: true })
    );    

    res.render('dashboard', {trips, loggedIn: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* Now, let's give a user a permit to edit the post, which belongs to the logged-in user */
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dbTripData = await Trip.findOne({
      where: {id: req.params.id},
      attributes: ['id','title','created_at','location','trip_description'],
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
          attributes: ['username']
        }
      ]
    });
    if(!dbTripData){
      res.status(404).json({ message: 'No post found with this id' });
      return;
    } else {
      const trip = dbTripData.get({ plain: true });
      res.render('edit-trip', {trip,loggedIn: true});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create', withAuth, async (req, res) => {
  try {
    const dbTripData = await Trip.findAll({
      where: {user_id: req.session.user_id}, // use the ID from the session
      attributes: ['id','title','location','starting_date','ending_date','trip_description'],
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
          attributes: ['username']
        }
      ]
    });

    const trips = dbTripData.map((trip) =>
      trip.get({ plain: true })
    );

    res.render('create-trip', {trips, loggedIn: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;