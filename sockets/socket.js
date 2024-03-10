function socket(io) {
    let historialChat = []; 

    io.on("connection", (socket) => {
        io.emit("saludo", "Hola soy el servidor");
        let diaCita;
        let nombreUsuario;

        socket.on("mensaje", (mensaje) => {
            historialChat.push({ usuario: nombreUsuario || 'Cliente', mensaje });

            var respuesta;
            switch (mensaje.toLowerCase()) {
                case "hola":
                    respuesta = "Hola, ¿Quieres agendar una cita? si / no";
                    break;
                case "si":
                    respuesta = "Por favor, podrías darme tu nombre.";
                    break;
                case "no":
                    respuesta = "Muy bien, fue un placer ayudarte. ¡Que tengas un buen día!";
                    break;
                case "lunes":
                case "martes":
                case "miércoles":
                case "jueves":
                case "viernes":
                    if (!nombreUsuario) {
                        respuesta = "Por favor, primero dime tu nombre.";
                    } else {
                        diaCita = mensaje;
                        respuesta = `Muy bien ${nombreUsuario}, ¿a qué hora te gustaría agendar la cita? 9, 10, 11, 12?`;
                    }
                    break;
                case "9":
                case "10":
                case "11":
                case "12":
                    if (!diaCita) {
                        respuesta = "Por favor, primero elige el día de la cita.";
                    } else {
                        respuesta = `Listo ${nombreUsuario}, tu cita ha sido agendada con éxito para el día ${diaCita} a las ${mensaje}. ¿Hay algo más en lo que pueda ayudarte? si / no`;
                    }
                    break;
                default:
                    if (!nombreUsuario) {
                        nombreUsuario = mensaje;
                        respuesta = `Dime ${nombreUsuario}, ¿qué día te gustaría agendar la cita: lunes, martes, miércoles, jueves, viernes?`;
                    } else {
                        respuesta = "Lo siento, no entendí eso. ¿Puedes repetirlo?";
                    }
                    break;
            }

            historialChat.push({ usuario: 'ChatBot', mensaje: respuesta });
            socket.emit("respuesta", { respuesta });
            io.emit("historial", historialChat);
        });
    });
}

module.exports = socket;
