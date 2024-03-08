function socket(io){ 
    io.on("connection",(socket)=>{
        io.emit("saludo","Hola soy el servidor");
        let diaCita;
        socket.on("mensaje",(mensaje)=>{
            var respuesta;
            switch (mensaje.toLowerCase()) {
                case "hola":
                    respuesta = "Hola, ¿cómo estás? ¿En qué puedo ayudarte?";
                    break;
                case "necesito agendar una cita":
                    respuesta = "Claro, ¿qué día te gustaría agendar? Lunes, Martes, Miércoles, Jueves o Viernes?";
                    break;
                case "lunes":
                case "martes":
                case "miércoles":
                case "jueves":
                case "viernes":
                    diaCita = mensaje;
                    respuesta = `Por supuesto, ¿a qué hora? 9, 10, 11 o 12?`;
                    break;
                case "9":
                case "10":
                case "11":
                case "12":
                    respuesta = `Tu cita ha sido agendada con éxito para el día ${diaCita} a las ${mensaje}. ¿Hay algo más en lo que pueda ayudarte?`;
                    break;
                case "no":
                    respuesta = "Muy bien, fue un placer ayudarte. ¡Que tengas un buen día!";
                    break;
                default:
                    respuesta = "Lo siento, no entendí eso. ¿Puedes repetirlo?";
            }
            io.emit("respuesta", respuesta);
        });
    });
}
module.exports = socket;
