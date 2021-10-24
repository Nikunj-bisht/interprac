const http = require('http');
console.log(require('./another'));
const fs = require('fs');

console.log(global);
// http.createServer(()=>{
// console.log('hello');
// }).listen(3000);
console.log('hey');
const th = require('worker_threads');
console.log(th);
function prom(){

return new Promise((res,rej)=>{

    res();


})


}

prom().then(()=>{
    console.log('hey');
})


function parent(){

const a = 10;
function child(){
console.log('o');
}

return child;

}


const fun = parent();
console.log(fun());

function hello(){

if(true){
var r = 10;
}


}
hello();



