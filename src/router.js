const express = require('express');

const sendmail = require('./app/sendmail');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'API'
    });
});

router.use('/sendmail', sendmail); // Public URL

module.exports = router;
