const router = require("express").Router();
const { Tech, Daily } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all Daily notes and post to the Tech Details page
router.get("/:id", withAuth, async (req, res) => {
  try {
    const dailyData = await Daily.findAll({
      where: { tech_id: req.params.id },
    });

    const dbTech = await Tech.findByPk(req.params.id);
    const tech = dbTech.get({ plain: true });

    const dailies = dailyData.map((daily) => daily.get({ plain: true }));
    console.log(dailies);
    console.log(tech);

    res.render("tech-details", {
      dailies,
      tech,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get tech id to associate daily note
router.get("/:id/add-daily", withAuth, async (req, res) => {
  try {
    const dbTech = await Tech.findByPk(req.params.id);
    const tech = dbTech.get({ plain: true });

    console.log(tech);

    res.render("add-daily-info", {
      tech,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
