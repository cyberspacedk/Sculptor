const Task = require("../models/taskModel");

module.exports.updateTask = (req, res) => {
  const { goalId, tasks } = req.body;

  try {
    tasks.forEach(element => {
      const { taskId, taskTitle } = element;

      Goal.findOneAndUpdate(
        { _id: goalId, "goalTasks._id": taskId },
        { $set: { "goalTasks.$.taskTitle": taskTitle } },
        { new: true, upsert: true }
      );
    });
    res.status(200).json({
      message: "Tasks updated!"
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

module.exports.addTask = async (req, res) => {  
  try {
    const newTask = new Task(req.body);
    await newTask.save();   
    res.status(201).json({ success: true, message: "Task created", data: newTask });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
