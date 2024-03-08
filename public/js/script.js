const socket = io();

var enviarDatos = document.getElementById("enviarDatos");
enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();
    var mensaje = document.getElementById("mensaje").value;
    var datos = document.getElementById("datos");
    socket.emit("mensaje", mensaje);
    socket.on("respuesta", (respuesta)=>{
        datos.innerHTML = respuesta;
    });
    document.getElementById("mensaje").value = "";
});
