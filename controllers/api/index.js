const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const tripRoutes = require('./tripRoutes');
const userRoutes = require('./userRoutes');
const addTripRoutes = require('./addTripRoutes')
const dailyRoutes = require('./dailyRoutes');
const tripDetailsRoutes = require('./tripDetailsRoutes');

router.use('/comment', commentRoutes);
router.use('/trip', tripRoutes);
router.use('/users', userRoutes);
// router.use('/add-trip', addTripRoutes); CAN DELETE
router.use('/trip-details', tripDetailsRoutes);
router.use('/add-daily-log', dailyRoutes);

module.exports = router;