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

// Create access key endpoint
router.post('/create-key', checkAdminPassword, async (req, res) => {
  try {
    const { plan = 'basic', email, credits } = req.body;
    
    const finalCredits = credits || keyGenerator.getCreditsForPlan(plan);
    const accessKey = await keyGenerator.generateUniqueKey(database);
    
    console.log(`[ADMIN] Creating key: ${accessKey}, plan: ${plan}, credits: ${finalCredits}`);
    
    await database.createAccessKey(accessKey, plan, finalCredits, email);
    
    console.log(`[ADMIN] Key created successfully: ${accessKey}`);
    
    res.json({
      success: true,
      accessKey,
      plan,
      credits: finalCredits,
      message: 'Access key created successfully'
    });
  } catch (error) {
    console.error('Create key error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Dashboard analytics endpoint
router.post('/dashboard', checkAdminPassword, async (req, res) => {
  try {
    const analytics = await database.getAdminAnalytics();
    res.json(analytics);
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
