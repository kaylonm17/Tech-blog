const router = require('express').Router();
const { Tech, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  Tech.findAll({
    attributes: ['id','title','created_at','tech_description'],
    order: [['created_at', 'DESC']],
    include: [
      // Comment model here -- attached username to comment
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'tech_id', 'user_id', 'created_at'],
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
  .then(dbTechData => res.json(dbTechData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tech.findOne({
    where: {id: req.params.id},
    attributes: ['id','title','created_at','tech_description'],
    include: [
      // include the Comment model here:
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'tech_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbTechData => {
    if (!dbTechData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTechData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', withAuth, (req, res) => {
  Tech.create({
    title: req.body.title,
    location: req.body.location,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date,
    tech_description: req.body.tech_description,
    user_id: req.session.user_id
  })
  .then(dbTechData => res.json(dbTechData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', withAuth, (req, res) => {
  Tech.update({
    title: req.body.title,
    location: req.body.location,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date,
    tech_description: req.body.tech_description,
  },
  {
    where: {id: req.params.id}
  })
  .then(dbTechData => {
    if (!dbTechData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTechData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
  Tech.destroy({
    where: {id: req.params.id}
  })
  .then(dbTechData => {
    if (!dbTechData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.json(dbTechData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;