let mongoose = require('mongoose')

// create a model class
let projectModel = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    enum: ["IT", "Finance", "Marketing", "HR", "Sales"], // will have dropdown-like behavior on front-end
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  peopleNeeded: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }},

  {
    collection:"projects"
  }

);

module.exports = mongoose.model('Project',projectModel);