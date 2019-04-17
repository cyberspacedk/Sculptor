const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = require('./taskModel');

const goalSchema = new Schema({

  goalTitle:{
    type:String,
    required: true
  },
  goalDescription:{
    type:String 
  },
  goalNumber:{
    type: Number,
    default: 1
  },
  // goalTasks: [taskSchema],
  goalColor:{
    type:String
  },
  goalEdit:{
    type: Boolean,
    default: false
  },
  goalCompleted:{
    type: Boolean,
    default: false
  },
  ownerId:{
    type:String,
    default: false
  }
})

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;