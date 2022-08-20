const mongoose = require('mongoose');

const PpdtSchema = new mongoose.Schema({

title:{
    type:String,
    unique:true
},
Time:{
    type:Date
},
imageName:{
    type:String
},
roomOpen:{
    type:Boolean
}

});

const Ppdt = mongoose.model('ppdt',PpdtSchema);
module.exports = Ppdt;