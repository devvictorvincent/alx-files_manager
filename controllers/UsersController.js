import sha1 from 'sha1';
import DbClient from '../utils/db';
import redisClient from '../utils/redis';


class UsersController {
    static async postNew (request, response) {
      const email = request.body ? request.body.email : null;
      const password = request.body ? request.body.password : null;
      
      if (!email) {
        response.status(400).json({ error: 'Missing email' });
      }
      if (!password) {
        response.status(400).json({ error: 'Missing password' });
      }
  
      const hashPwd = sha1(password);
  
      try {
        const collection = DbClient.db.collection('users');
        const user1 = await collection.findOne({ email });
  
        if (user1) {
          response.status(400).json({ error: 'Already exist' });
        } else {
          collection.insertOne({ email, password: hashPwd });
          const newUser = await collection.findOne(
            { email }, { projection: { email: 1 } }
          );
          response.status(201).json({ id: newUser._id, email: newUser.email });
        }
      } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Server error' });
      }
    }
    
    static async getMe(request, response) {
    const { user } = req;

    response.status(200).json({ email: user.email, id: user._id.toString() });
  }
}  

export default UsersController;
