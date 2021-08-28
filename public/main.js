
let user_name = localStorage.getItem('name');
let room_n = localStorage.getItem('rname');

var io = io.connect(window.location.host);

io.emit("create",{room_name:room_n});

io.on("added",(msg)=>{
    console.log(msg);
})