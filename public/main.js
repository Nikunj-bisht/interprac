
let user_name = localStorage.getItem('name');
let room_n = localStorage.getItem('rname');
var iop = io('http://localhost:3000', {path: '/chat'})
var gdio = io('http://localhost:3000', {path: '/gd'})
// var io = io.connect("http://localhost:3000/chat");
console.log(window.location.host);
// io.emit("create",{room_name:room_n});
let init = 30;
gdio.emit("create",{room_name:room_n});
setInterval(()=>{
    gdio.emit('start',{room_name:room_n,countTimer:init});
   init--;
},1000) 
gdio.on('count',(ct)=>{
    console.log(ct,'count');
});

// gdio.emit("create",{room_name:room_n});
// io.on("members",(msg)=>{
//     console.log(msg);
// })