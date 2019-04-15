const User = require('../models/userModel');


// ------------ create new User ------------------
module.exports.newUser = async (req,res) =>{
// catch data from request body
  const data = {
    email:req.body.email,
    password:req.body.password, 
  }
// create user based user model
  const newUser = new User(data);

// if err send error message 
  await newUser.save((err,doc)=> {
    if(err){ 
      res.json({status: false, message:err.message})
    } 
    res.json({
      status: 'Success',
      message:'User created',
      user:doc
    })
  }); 
  
} 
// -----------------------------------------------


// --------------- login User --------------------
module.exports.login = async (req, res) =>{
// get email we will find user with this email 
  const email = req.body.email;

// lets find user using mongoose method findOne
 const knockKnock =  await User.findOne({email}, (err,user)=>{
// if user not found throw error json
    if(err){
      res.status(400).json({
      message: err.message
     })
    }
// if user found - send json
    res.json({
      success: true,
      message: 'User succesfully logined',
      user:{ 
        id : user._id,
        token: 'hdfjtFf%8sdfsm2n'
        } 
    })
  }).lean();
  // lean method clean up object from odd methods and make object clean  
} 


// ----------------- UPDATE DATA -------------------------

module.exports.updatePassword = async (req,res)=>{
  const newPassword = req.body.newPassword;
  const id = req.body.id;
 
  const updated =  await User.findById({_id: id});

  updated.password = newPassword;
  await updated.save();
  res.send(updated);
   
}

// --------------------------  LOGOUT --------------------------
module.exports.logout = (req,res) =>{
  res.json({
    message: 'User successfully Logout'
  })
} 

const sss = ()=>{
  console.log('ffff');
}
;