const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');
console.log(userController);
// start authentificated block

// call userController.newUser function imported from controllers
router.post('/registration', userController.newUser)


router.post('/update', userController.updatePassword)





router.post('/login',  userController.login); 

router.get('/logout', (req,res)=>{ 
  res.status(200).json({ 
    success: true,
    message: 'user John successfully logout'
  })
}) 
// end authentificated block













module.exports = router;