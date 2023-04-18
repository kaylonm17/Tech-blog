const router = require('express').Router();
const { Daily, Tech } = require('../../models');
const withAuth = require('../../utils/auth');

//Post new daily notes to the Tech Details page
router.post('/', withAuth, async (req, res) => {
    try {

    const newDailyLog = await Daily.create({
        date_created: req.body.date_created,
        places_visited: req.body.places_visited,
        daily_notes: req.body.daily_notes,
        user_id: req.session.user_id,
        tech_id: req.body.tech_id,

    });
    
    res.status(200).json(newDailyLog);
    } catch (err) {
        res.status(400).json(err);
    }
    
});

module.exports = router;