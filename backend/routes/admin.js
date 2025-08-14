const express = require('express');
const router = express.Router();
const database = require('../src/utils/database');
const keyGenerator = require('../src/utils/keyGenerator');

// --- Admin Endpoints (Protected by master admin password) ---
const ADMIN_PASSWORD = 'KeywordAlchemist2025@SuperAdmin#Dashboard$Analytics!';

// Middleware to check admin password
const checkAdminPassword = (req, res, next) => {
  const { masterPassword } = req.body;

  if (masterPassword !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid master admin password' });
  }

  next();
};

module.exports = router;
