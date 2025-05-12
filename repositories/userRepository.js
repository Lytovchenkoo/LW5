const db = require('./db'); 

async function getUserByUsername(username) {
  const [rows] = await db.query('SELECT * FROM login WHERE username = ?', [username]);
  return rows[0] || null; 
}

module.exports = {
  getUserByUsername
};
