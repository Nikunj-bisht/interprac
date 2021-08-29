
const topic_model = require('./models/topicschema');


exports.gettopics = async()=>{


const response = await topic_model.find();

return response;



}