const socket = io();

var enviarDatos = document.getElementById("enviarDatos");
enviarDatos.addEventListener("submit", (e) => {
    e.preventDefault();
    var mensaje = document.getElementById("mensaje").value;
    socket.emit("mensaje", mensaje);

    document.getElementById("mensaje").value = "";
});

socket.on("respuesta", ({ respuesta }) => {
    var historialHTML = document.getElementById("historial-chat").innerHTML;

    historialHTML += `<div>ChatBot: ${respuesta}</div>`;
    document.getElementById("historial-chat").innerHTML = historialHTML;
});

socket.on("historial", (historialChat) => {
    var historialHTML = "";
    historialChat.forEach((item) => {
        historialHTML += `<div>${item.usuario}: ${item.mensaje}</div>`;
    });
    document.getElementById("historial-chat").innerHTML = historialHTML;
});
