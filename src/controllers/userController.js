const User = require('../models/userModel');
const jwt = require('jsonwebtoken');





// ------------ CREATE NEW USER ----------------
module.exports.newUser = async (req,res) =>{
// catch data from request body
  const data = {
    email:req.body.email,
    password:req.body.password, 
  }

  try{
    // create user based user model
    const newUser = await new User(data);

    await newUser.save();

    res.status(201).json({
      status: 'Success',
      message:'User created',
      user: newUser
    });  
    
  }catch(err){
    res.status(400).json({status: false, message:err.message})
  } 
  
} 


// --------------- LOGIN USER ------------------
module.exports.login = async (req, res) =>{

// get email we will find user with this email 
  const email = req.body.email;
  try{
    const user = await User.findOne({email});  
    const token = jwt.sign({user: user.email}, 'secret-word', {expiresIn: 10000} );  
    res.status(200).json({success:true, message:'User found', userId:user._id, token:token}); 
  }catch(error){
    res.status(404).json({success:false, message: error.message})
  }
} 



module.exports.verify = (token)=>{

  try {
    const decoded = jwt.verify(token, 'secret-word');
    next()
  } catch(err) {
     res.send("Invalid token")
  }
}



// ----------------- UPDATE DATA ----------------

module.exports.updatePassword = async (req,res)=>{
  const newPassword = req.body.newPassword;
  const id = req.body.id;
 
  const updated =  await User.findById({_id: id});

  updated.password = newPassword;
  await updated.save();
  res.send(updated);
   
}


// ----------------- LOGOUT --------------------
module.exports.logout = (req,res) =>{
  res.json({
    message: 'User successfully Logout'
  })
} 