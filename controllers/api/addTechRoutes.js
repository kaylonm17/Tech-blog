const router = require('express').Router();
// const { User, Tech } = require('../../models');

router.get('/', (req, res) => {
    res.render('add')
})



module.exports = router;