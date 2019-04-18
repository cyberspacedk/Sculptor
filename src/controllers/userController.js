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

// получаем данные от юзера
  const {email, password} = req.body;

  try{
// находим конкретного юзера пр email
    const user = await User.findOne({email});   
// сравниваем пароль  
    newUser.comparePassword(password, (error, isMatch)=>{ 
      if(isMatch){ 
// создаем токен, подписываем его  
      const token = jwt.sign({user : user.email}, 'secret-word');
// отвечаем. передавая дополнительно на клиент _id и token юзера
      res.status(200).json({success:true, message:'User found', userId: user._id, token:token}); 
    }else{
      res.status(401).json({success:false, message:'Not valid'})
    }
    }) 
  }
  catch(error){
    res.status(404).json({success:false, message: error.message})
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