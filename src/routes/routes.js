const express = require('express');
const router = express.Router();

// start authentificated block
const userController = require('../controllers/userController'); 

router.post('/registration', userController.newUser);  
router.post('/login',  userController.login);   
router.post('/update', userController.updatePassword);  
router.get('/logout',  userController.logout); 

// ROUTES for GOALS manipulation
const goalController = require('../controllers/goalController');

router.post('/goal',goalController.createNewGoal ); 
router.delete('/goal',goalController.deleteGoal );
router.put('/goal', goalController.updateGoal); 
router.get('/goal', goalController.getAllGoalsByOwnerId );

// ROUTES for task
const taskController= require('../controllers/taskController');

router.put('/task', taskController.updateTask);
router.post('/task', taskController.addTask);











module.exports = router;