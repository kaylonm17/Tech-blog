const router = require('express').Router();
const { Daily, Trip } = require('../../models/Index');
const withAuth = require('../../utils/auth');

//Post new daily notes to the Trip Details page
router.post('/', withAuth, async (req, res) => {
    try {

    const newDailyLog = await Daily.create({
        date_created: req.body.date_created,
        places_visited: req.body.places_visited,
        daily_notes: req.body.daily_notes,
        user_id: req.session.user_id,
        trip_id: req.body.trip_id,

    });
    
    res.status(200).json(newDailyLog);
    } catch (err) {
        res.status(400).json(err);
    }
    
});

module.exports = router;