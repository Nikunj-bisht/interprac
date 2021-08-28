const mongoose = require('mongoose');

const Topicschema = new mongoose.Schema({

title :{
    type:String,
    unique:true
},
Time:{
    type:Date
},

Code:{
    type:String,
    unique:true
},

});

Topicschema.pre('save' , function(next){

        this.Time = Date.now();
        next();

});

const Topic = mongoose.model('topics' , Topicschema);
module.exports = Topic;