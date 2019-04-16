const Goal = require("../models/goalModel");

// create new goal
module.exports.createNewGoal = async (req, res) => {
  try{
    // создаем екземпляр по конструктору
    const newGoal = new Goal(req.body);
    // сохраняем 
    await newGoal.save();
    // отвечаем
    res.status(201).json({success:true, message: 'SUCCES. GOAL SAVED'});
  }catch(err){ 
    res.status(400).json({success:false, message: err.message})
  } 
};

// delete Goal
module.exports.deleteGoal = async (req, res) => {
  const id = req.body.id;
  try{
    const deleted = await Goal.findByIdAndDelete(id);
    res.status(200).json({success:true, message: 'DELETED', data: deleted});
  }catch(err){ ;
    res.status(400).json({success:false,message: err.message})
  } 
};

// update Goal
module.exports.updateGoal = async (req, res) => {

  const goalId = req.body.goalId;
  const task = req.body.task;
  
  try {
    const updated = await Goal.findByIdAndUpdate(goalId,{ $push: { goalTasks: task} },{new: true});
    res.status(200).json({success:true, message: 'UPDATED', data: updated});
  } catch (err) { 
    res.status(400).json({success:false, message: err.message});
  }
};

// get All by owner ID
module.exports.getAllGoalsByOwnerId = async (req, res) => {
  const ownerId = req.body.ownerId;
  try {
    const getOwnerGoals = await Goal.find({ownerId}); 
    if(!getOwnerGoals.length){
      res.status(404).json({
        succes: false,
        message: 'Not have data'
      })
    }
    res.status(200).json({
      succes: true,
      message: 'OK',
      data: getOwnerGoals
    });
  } catch (err) { 
    res.status(400).json({success: false, message: err.message})
  }
};

