const router = require('express').Router();
// const { User, Trip } = require('../../models');

router.get('/', (req, res) => {
    res.render('add')
})



module.exports = router;