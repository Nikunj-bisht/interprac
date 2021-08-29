
const topic_model = require('./models/topicschema');


exports.gettopics = async()=>{


const response = await topic_model.find();

return response;



}

exports.savetopic = async(tit , code)=>{


    const saved_topic = await topic_model.create({

        title: tit, Code: code

    });

    return saved_topic;

}