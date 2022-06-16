const mongoose = require('mongoose');

var firstSchema = new mongoose.Schema(
    {
        name: { type: String},
        image:{type:String},
        price:{type:Number},
        description:{type:String},
    },
 {
  collection:"crud"
 }
);

module.exports = mongoose.model('crud' , firstSchema)