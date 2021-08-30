const express = require('express');
const app = express();
const path = require('path');
const httpserver = require('http').createServer(app);
const topic_model = require('./models/topicschema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const controller = require('./Samplecontroller');
const socket = require('socket.io')(httpserver, {

    cors: {
            origin: "https://interprac.herokuapp.com/",
            method: ["GET", "POST"]
          }
    });
const { Rooms } = require('./Allroms');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//process.env.MONGO_URL/////mongodb+srv://nicola:qObaF401D1ej4Vj4@cluster0.3uhra.mongodb.net/authusers?retryWrites=true&w=majority
mongoose.connect(
    process.env.MONGO_URL
    , {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
const rooms = new Rooms();

socket.on('connect', (soc) => {

    console.log("new socket ");

    soc.on('create', (user_data) => {

        const { room_name } = user_data;
        console.log(user_data);
        rooms.addnewroom(room_name);
        soc.join(room_name);
        const mem = rooms.getmembers(room_name);
        socket.sockets.in(room_name).emit("members", mem);
        // soc.to(room_name).emit("added", mem);


    });



});

app.get('/', (req, res) => {


    res.sendFile(path.join(__dirname, './public', 'index.html'));


});

app.get('/joinroom', (req, res) => {


    res.sendFile(path.join(__dirname, './public', 'nikunj.html'));


});

app.post('/save', async (req, res) => {

    try {
        const { tit, code } = req.body;

        const response = controller.savetopic(tit, code);
        res.status(200).json({
            status: 'success',
            data: response

        })

    } catch (err) {

        res.status(200).json({
            status: 'error'

        })

    }


})

app.get('/getall', async (req, res) => {

    try {

        const resp = await controller.gettopics();
        console.log(resp);
        res.status(200).json({
            status: 'success',
            data: resp

        });
    } catch (err) {

        res.status(200).json({
            status: 'error'

        })
    }

})



app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

httpserver.listen(port, () => {

    console.log('server started');
    // call socket file here 

});


