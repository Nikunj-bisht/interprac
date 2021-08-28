var btn = document.getElementById('send');
var join = document.getElementById('join');

btn.addEventListener('click',(e)=>{

    let name = document.getElementById('login__username').value;
    let room_name = document.getElementById('room_name').value;
    console.log(name,room_name);
if(name.length == 0 || room_name.length == 0){

alert('Fields are empty');
    return;
}

e.preventDefault();

localStorage.setItem('name',name);
localStorage.setItem('rname',room_name);

window.open("http://localhost:3000/joinroom");
//"http://localhost:3000/joinroom"
//"https://drawersoc.herokuapp.com/joinroom"
});

join.addEventListener('click',(e)=>{

e.preventDefault();

let name = document.getElementById('login__joinusername').value;
    let room_name = document.getElementById('joinroom_name').value;
    console.log(name,room_name);
if(name.length == 0 || room_name.length == 0){

alert('Fields are empty');
    return;
}

e.preventDefault();

localStorage.setItem('name',name);
localStorage.setItem('rname',room_name);

window.open("http://localhost:3000/joinroom");




})