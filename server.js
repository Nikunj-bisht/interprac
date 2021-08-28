const express = require('express');
const app = express();
const path = require('path');
const httpserver = require('http').createServer(app);
const topic_model = require('./models/topicschema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const socket = require('socket.io')(httpserver);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//process.env.MONGO_URL/////mongodb+srv://nicola:qObaF401D1ej4Vj4@cluster0.3uhra.mongodb.net/authusers?retryWrites=true&w=majority
mongoose.connect(
    'mongodb+srv://nicola:qObaF401D1ej4Vj4@cluster0.3uhra.mongodb.net/authusers?retryWrites=true&w=majority'

    , {
        useUnifiedTopology: true,
        useNewUrlParser: true,

    });


socket.on('connect', (soc) => {

    console.log("new socket ");

    soc.on('create', (user_data) => {

        const { room_name } = user_data;
        console.log(user_data);
        soc.join(room_name);
        soc.to(room_name).emit("added", "yo");


    });

    soc.on('join', (user_data) => {
        const { room_name } = user_data;
        soc.join(room_name);
    });


});

app.get('/', (req, res) => {


    res.sendFile(path.join(__dirname, './public', 'index.html'));


});

app.get('/joinroom', (req, res) => {


    res.sendFile(path.join(__dirname, './public', 'nikunj.html'));


});

app.post('/save', async (req, res) => {

    const { tit, code } = req.body;
    try {
  const saved_topic = await topic_model.create({

            title: tit, Code: code

        });

        res.status(200).json({
status:'success',
data:saved_topic

        })

    }catch(err){

        res.status(200).json({
            status:'error'
            
                    })
            
    }
         

})

app.get('/getall',async(req,res)=>{

const response = await topic_model.find();

console.log(response);

})



app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

httpserver.listen(port, () => {

    console.log('server started');
    // call socket file here 

});


