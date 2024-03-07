const socket = io();
//console.log(socket);
/*socket.on("saludo",(saludo)=>{
    console.log("Estoy recibiendo tu mensaje "+ saludo);
});

socket.emit("respuesta","respuesta del cliente");*/

//http://localhost:3000/socket.io/socket.io.min.js

var enviarDatos = document.getElementById("enviarDatos");
enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();
    var nombre=document.getElementById("nombre").value;
    var datos=document.getElementById("datos");
    socket.emit("nombre", nombre);
    socket.on("saludo", (saludo)=>{
        //console.log(saludo);
        datos.innerHTML = saludo;
    })

    /*var usuario=document.getElementById("usuario").value;
    var password=document.getElementById("password").value;
    console.log("Formulario enviado.............");
    console.log("nombre");
    console.log("usuario");
    console.log("password");
    document.getElementById("nombre").value="";
    document.getElementById("usuario").value="";
    document.getElementById("password").value="";
    document.getElementById("nombre").focus();*/
});
