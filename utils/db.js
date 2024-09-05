import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.envDB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.mongoClient = new MongoClient(url, { useUnifiedTopolofy: true });
    this.db = null;

    this.mongoClient.connect()
      .then(() => {
        console.log('Connected Succesfully to MongoDB');
        this.db = this.mongoClient.db(database);
      })
      .catch((error) => console.error(error));
  }

  isAlive() {
    return this.mongoClient && this.mongoClient.isConnected();
  }

  async nbusers() {
    try {
      const userCollection = this.dbconnection('users');
      return await userCollection.countDocuments();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Asynchronous function to return the number of files
  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (error) {
      console.error('Error counting files:', error);
      throw error;
    }
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
