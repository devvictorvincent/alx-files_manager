import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.redisClient = createClient();
    this.redisClient.on('error', (error) => {
      console.log(error);
    });
    this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
    this.setAsync = promisify(this.redisClient.set).bind(this.redisClient);
    this.delAsync = promisify(this.redisClient.del).bind(this.redisClient);
  }

  isAlive() {
    return this.redisClient.connected;
  }

  async get(key) {
    try {
      const value = this.getAsync(key);
      return value;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async set(key, value, duration) {
    try {
      await this.setAsync(key, value, 'EX', duration);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async del(key) {
    try {
      await this.delAsync(key);
    } catch (error) {
      console.error(error);
    }
  }
}
const redisClient = new RedisClient();
module.exports = redisClient;
