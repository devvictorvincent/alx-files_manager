const RedisClient = require('../utils/redis'); // Ensure RedisClient is correctly implemented
const DBClient = require('../utils/db'); // Ensure DBClient is correctly implemented

const getStatus = async (req, res) => {
  try {
    // Check Redis connection
    const redisAlive = await RedisClient.ping(); // Adjust if your RedisClient method differs
    
    // Check DB connection
    const dbAlive = await DBClient.isConnected(); // Implement isConnected method in DBClient
    
    res.status(200).json({
      redis: redisAlive,
      db: dbAlive,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStats = async (req, res) => {
  try {
    // Count users and files
    const usersCount = await DBClient.countDocuments('users'); // Adjust if your DBClient method differs
    const filesCount = await DBClient.countDocuments('files'); // Adjust if your DBClient method differs
    
    res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getStatus,
  getStats,
};
