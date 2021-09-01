const {Room} = require('./room');


class Rooms{

constructor(){
this.rooms = new Map();
}

addnewroom(room_name){
if(this.rooms.has(room_name)){
this.rooms.get(room_name).members+=1;
}else{
    this.rooms.set(room_name,new Room());
}
}

getmembers(room_name){
    return this.rooms.get(room_name).members;
}

dec_counter(room_name){
this.rooms.get(room_name).members-=1;
}

}


module.exports = {
    Rooms
}