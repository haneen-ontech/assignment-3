let mongoose = require('mongoose')

// create a mongoose schema for the project class
let projectModel = mongoose.Schema({
  title: {
    type: String,
    required: true // means it is a mandatory input for this object
  },
  department: {
    type: String,
    enum: ["IT", "Finance", "Marketing", "HR", "Sales"], // only these values are considered true (accepted), will have dropdown-like behavior on front-end
    required: true
  },
  dueDate: {
    type: Date, // date type to allow users to access a calendar
    required: true
  },
  peopleNeeded: {
    type: Number, // number type to ensure users only input integers
    required: true
  },
  description: {
    type: String
  }},

  {
    collection:"projects" // schema created for my projects collection
  }

);

module.exports = mongoose.model('Project',projectModel);