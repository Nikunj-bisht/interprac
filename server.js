const express = require('express');
const app = express();
const path = require('path');
const httpserver = require('http').createServer(app);
const topic_model = require('./models/topicschema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const controller = require('./Samplecontroller');
const df = require('dialogflow-fulfillment')
const { Rooms } = require('./Allroms');
const { count } = require('console');

const chatRooms = new Rooms();
const gdRooms = new Rooms();


const socket = require('socket.io')(httpserver,{path:'/chat'}, {
    // https://interprac.herokuapp.com/
    cors: {
            origin: "https://interprac.herokuapp.com",
            method: ["GET", "POST"]
          }
    });

    const gdsocket = require('socket.io')(httpserver,{path:'/gd'}, {
        // https://interprac.herokuapp.com/
        cors: {
                origin: "https://interprac.herokuapp.com",
                method: ["GET", "POST"]
              }
        });
    
    

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//process.env.MONGO_URL/////mongodb+srv://nicola:qObaF401D1ej4Vj4@cluster0.3uhra.mongodb.net/authusers?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://nicola:qObaF401D1ej4Vj4@cluster0.3uhra.mongodb.net/authusers?retryWrites=true&w=majority'
    , {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then((res)=>{
        console.log('connected to db');
    });

gdsocket.on('connect',(soc)=>{
    console.log('gd')
    soc.on('create', (user_data) => {
        const { room_name } = user_data;
        console.log(user_data);
        gdRooms.addnewroom(room_name);
        soc.join(room_name);
        const mem = gdRooms.getmembers(room_name);
        // socket.sockets.in(room_name).emit("members", mem);
        // soc.to(room_name).emit("added", mem);   
    });

    soc.on('start',({room_name,countTimer})=>{
          //   let id =  setInterval(()=>{
        // soc.broadcast.to(room_name).emit("count",countTimer);
        //  gdsocket.sockets.in(room_name).emit("count", countTimer);
         gdsocket.sockets.in(room_name).emit("count", countTimer);
    //     if(init <= 0){
    //         console.log('stop')
    //         clearInterval(id)
    //     }
    //    },1000);
       
    })

    soc.on('showimage',({room_name})=>{
        gdsocket.sockets.in(room_name).emit("image","Started");
    })


})

socket.on('connect', (soc) => {
    console.log("connected")
    soc.on('create', (user_data) => {
        const { room_name } = user_data;
        console.log(user_data);
        chatRooms.addnewroom(room_name);
        soc.join(room_name);
        const mem = chatRooms.getmembers(room_name);
        socket.sockets.in(room_name).emit("members", mem);
        // soc.to(room_name).emit("added", mem);
    });

soc.on("mssg",(message_pack)=>{
const {room_name , message , user_name} = message_pack;
    socket.sockets.in(room_name).emit("getmsg", {mess:message,user:user_name});

});

soc.on("type",(room_name)=>{

    socket.sockets.in(room_name).emit("typing", "--");


})


soc.on('disconnect',(room_name)=>{

chatRooms.dec_counter(room_name);
console.log("removed",soc.id);
})

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


app.post('/getsearch',async(req,res)=>{

    try{

        const {typed} = req.body;
        const searched_room =  await controller.findroom(typed);
        res.status(200).json({
            status:"success",
            rooms:searched_room
        });
    }catch(err){
        res.status(200).json({
            status:"error"
        });
    }

    
})


app.post('/',(req,res)=>{
    
})



app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

httpserver.listen(port, () => {

    console.log('server started');
    // call socket file here 

});


