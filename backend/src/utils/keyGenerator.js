const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

class KeyGenerator {
  // Generate complex access key in format: KWA-XXX-XXX-XXX (9 additional characters)
  generateAccessKey() {
    const prefix = 'KWA';
    
    // Generate 3 segments of 3 characters each
    const segments = [];
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoiding confusing chars like 0,O,1,I
    
    for (let i = 0; i < 3; i++) {
      let segment = '';
      for (let j = 0; j < 3; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      segments.push(segment);
    }
    
    return `${prefix}-${segments.join('-')}`;
  }

  // Generate crypto-secure access key (alternative method)
  generateSecureAccessKey() {
    const prefix = 'KWA';
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    
    // Use crypto for better randomness
    const randomBytes = crypto.randomBytes(9);
    const segments = [];
    
    for (let i = 0; i < 3; i++) {
      let segment = '';
      for (let j = 0; j < 3; j++) {
        const index = randomBytes[i * 3 + j] % chars.length;
        segment += chars.charAt(index);
      }
      segments.push(segment);
    }
    
    return `${prefix}-${segments.join('-')}`;
  }

  // Generate unique key (check against database)
  async generateUniqueKey(database) {
    let key;
    let exists = true;
    
    while (exists) {
      key = this.generateSecureAccessKey(); // Use the more secure version
      const existing = await database.getAccessKey(key);
      exists = !!existing;
    }
    
    return key;
  }

  // Credit amounts by plan
  getCreditsForPlan(plan) {
    const credits = {
      basic: 10,
      blogger: 100,
      pro: 240,
      admin: 700 // Added admin plan
    };
    
    return credits[plan] || 0;
  }
}

module.exports = new KeyGenerator();
