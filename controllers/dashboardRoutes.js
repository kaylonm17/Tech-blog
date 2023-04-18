const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Tech, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbTechData = await Tech.findAll({
      where: {user_id: req.session.user_id}, // use the ID from the session
      attributes:['id','title','location','tech_description','starting_date','ending_date','created_at'],
      order: [['created_at','DESC']],
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
          attributes: ['username']
        }
      ],
    });
  
    const techs = dbTechData.map((tech) =>
      tech.get({ plain: true })
    );    

    res.render('dashboard', {techs, loggedIn: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/* Now, let's give a user a permit to edit the post, which belongs to the logged-in user */
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dbTechData = await Tech.findOne({
      where: {id: req.params.id},
      attributes: ['id','title','created_at','location','tech_description'],
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
          attributes: ['username']
        }
      ]
    });
    if(!dbTechData){
      res.status(404).json({ message: 'No post found with this id' });
      return;
    } else {
      const tech = dbTechData.get({ plain: true });
      res.render('edit-tech', {tech,loggedIn: true});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create', withAuth, async (req, res) => {
  try {
    const dbTechData = await Tech.findAll({
      where: {user_id: req.session.user_id}, // use the ID from the session
      attributes: ['id','title','location','starting_date','ending_date','tech_description'],
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
          attributes: ['username']
        }
      ]
    });

    const techs = dbTechData.map((tech) =>
      tech.get({ plain: true })
    );

    res.render('create-tech', {techs, loggedIn: true});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;