const Goal = require("../models/goalModel");

module.exports.updateTask = (req, res) => {
  
  const goalId = req.body.goalId;
  const taskElementId = req.body.taskElementId;
  const taskTitle = req.body.taskTitle;

  Goal.findOneAndUpdate(
    { _id:goalId,"goalTasks._id":taskElementId},
    { $set:{"goalTasks.$.taskTitle":taskTitle}  },
    {new:true,upsert:true},
    (err,doc)=>{
        if(err){ return console.log(err)}
        console.log(doc);
        res.json(doc)
    }
  )
}


module.exports.addTask = async (req, res) => {
  const goalId = req.body.goalId;
  const task = req.body.task;
  try {
    const updated = await Goal.findByIdAndUpdate(
      goalId,
      { $push: { goalTasks: task } },
      { new: true }
    );
    res.status(200).json({ success: true, message: "UPDATED", data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
