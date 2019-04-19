const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
// middleware
const authCheck = require('../middleware/authCheck');

// PUBLIC ROUTES ---------------

// start authentificated block
const userController = require('../controllers/userController'); 

router.post('/registration', userController.newUser);  

router.post('/login',  userController.login);   
router.post('/update', userController.updatePassword);  
router.get('/logout',  userController.logout); 


// PRIVATE ROUTE ---------------

// ROUTES for GOALS manipulation
const goalController = require('../controllers/goalController');

router.post('/goal', authCheck ,goalController.createNewGoal ); 
router.delete('/goal', authCheck ,goalController.deleteGoal );
router.put('/goal', authCheck , goalController.updateGoal); 
router.get('/goal', authCheck , goalController.getAllGoalsByOwnerId );

// ROUTES for task
const taskController= require('../controllers/taskController');

router.put('/task', authCheck , taskController.updateTask);
router.post('/task', authCheck , taskController.addTask);

// GITHUB
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  })
);

// GOOGLE
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  })
);

// FACEBOOK
router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  })
);




module.exports = router;