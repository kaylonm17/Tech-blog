const router = require("express").Router();
const { Trip, Daily } = require("../../models/Index");
const withAuth = require("../../utils/auth");

// Get all Daily notes and post to the Trip Details page
router.get("/:id", withAuth, async (req, res) => {
  try {
    const dailyData = await Daily.findAll({
      where: { trip_id: req.params.id },
    });

    const dbTrip = await Trip.findByPk(req.params.id);
    const trip = dbTrip.get({ plain: true });

    const dailies = dailyData.map((daily) => daily.get({ plain: true }));
    console.log(dailies);
    console.log(trip);

    res.render("trip-details", {
      dailies,
      trip,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get trip id to associate daily note
router.get("/:id/add-daily", withAuth, async (req, res) => {
  try {
    const dbTrip = await Trip.findByPk(req.params.id);
    const trip = dbTrip.get({ plain: true });

    console.log(trip);

    res.render("add-daily-info", {
      trip,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
