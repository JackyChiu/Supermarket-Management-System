'use strict';

const express = require('express');
const router = express.Router();

// Get request at root => render
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
