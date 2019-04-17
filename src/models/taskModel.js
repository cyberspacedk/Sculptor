const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({

  taskTitle:{
    type: String,
    required: true
  },
  taskWeekRange:{
    type: Number,
    required: true
  },
  taskStartDate:{
    type: Date
  },
  taskFinishDate:{
    type: Date
  },
  isTaskActive:{
    type: Boolean
  } ,
  ownerId:{
    type:String, 
  },
  refGoal:{
    type:Schema.Types.ObjectId,
    ref: 'Goal' 
  }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;