import express from 'express';

const router = express.Router();
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');

// Define routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', (req, res) => {
	UserController.postNew (req, res);
});

module.exports = router;
