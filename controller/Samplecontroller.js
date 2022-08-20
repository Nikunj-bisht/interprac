
const topic_model = require('../models/topicschema');
console.log(topic_model);

exports.gettopics = async () => {


    const response = await topic_model.find();

    return response;



}

exports.findroom = async (room) => {

    const rooms = await topic_model.find({ title: room });
    return rooms;


}

exports.savetopic = async (tit, code) => {


    const saved_topic = await topic_model.create({

        title: tit, Code: code

    });

    return saved_topic;

}