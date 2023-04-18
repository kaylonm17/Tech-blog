const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const techRoutes = require('./techRoutes');
const userRoutes = require('./userRoutes');
const addTechRoutes = require('./addTechRoutes')
const dailyRoutes = require('./dailyRoutes');
const techDetailsRoutes = require('./techDetailsRoutes');

router.use('/comment', commentRoutes);
router.use('/tech', techRoutes);
router.use('/users', userRoutes);
// router.use('/add-tech', addTechRoutes); CAN DELETE
router.use('/tech-details', techDetailsRoutes);
router.use('/add-daily-log', dailyRoutes);

module.exports = router;