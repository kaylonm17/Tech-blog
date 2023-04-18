const router = require('express').Router();
const { Trip, User, Comment } = require('../../models/Index');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  Trip.findAll({
    attributes: ['id','title','created_at','trip_description'],
    order: [['created_at', 'DESC']],
    include: [
      // Comment model here -- attached username to comment
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'trip_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      },
    ]
  })
  .then(dbTripData => res.json(dbTripData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Trip.findOne({
    where: {id: req.params.id},
    attributes: ['id','title','created_at','trip_description'],
    include: [
      // include the Comment model here:
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'trip_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbTripData => {
    if (!dbTripData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTripData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, (req, res) => {
  Trip.create({
    title: req.body.title,
    location: req.body.location,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date,
    trip_description: req.body.trip_description,
    user_id: req.session.user_id
  })
  .then(dbTripData => res.json(dbTripData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', withAuth, (req, res) => {
  Trip.update({
    title: req.body.title,
    location: req.body.location,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date,
    trip_description: req.body.trip_description,
  },
  {
    where: {id: req.params.id}
  })
  .then(dbTripData => {
    if (!dbTripData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTripData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  Trip.destroy({
    where: {id: req.params.id}
  })
  .then(dbTripData => {
    if (!dbTripData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTripData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;