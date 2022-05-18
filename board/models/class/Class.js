// models/Post.js

var mongoose = require('mongoose');

// schema
var classSchema = mongoose.Schema({ 
  school_name:{type:String, required:true},
  title:{type:String, required:true},
  body:{type:String, required:true},
  createdAt:{type:Date, default:Date.now}, 
  updatedAt:{type:Date},
});

// model & export
var Class = mongoose.model('class', classSchema, 'class');
module.exports = Class;