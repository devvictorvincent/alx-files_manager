const RedisClient = require('../utils/redis');
const DBClient = require('../utils/db');

const getStatus = async (req, res) => {
  try {
    // Check Redis connection
    const redisAlive = await RedisClient.isAlive();

    // Check DB connection
    const dbAlive = await DBClient.isAlive();

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
    const usersCount = await DBClient.nbUsers();
    const filesCount = await DBClient.nbFiles();

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
