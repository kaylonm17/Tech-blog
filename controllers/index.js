const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');
const multerRoutes = require('./multerRoutes')

router.use('/', homeRoutes);
router.use('/upload', multerRoutes);
router.use('/dashboard',dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
