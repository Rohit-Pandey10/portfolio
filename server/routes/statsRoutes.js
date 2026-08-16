/**
 * statsRoutes.js — CP stats route
 * Mounts at /api/cp-stats (see server.js)
 */

const express = require('express');
const router = express.Router();
const { getCpStats } = require('../controllers/statsController');

// GET /api/cp-stats
router.get('/', getCpStats);

module.exports = router;
