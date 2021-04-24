//******************************************** */
var TEMPERATURA = 0;
var HUMEDAD = 0;
var SERVER = "192.168.1.39";
var PUERTO = 9001;
var indicador = 0;
var mensaje = "";
// Create a client instance
client = new Paho.MQTT.Client(SERVER, PUERTO, "clientId");

// set callback handlers
client.onConnectionLost = function(responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
}

client.onMessageArrived = function(message) {
    console.log("Message llega: " + message.payloadString);

    var data_json = JSON.parse(message.payloadString);
    TEMPERATURA = Number(data_json.temperatura);
    HUMEDAD = Number(data_json.humedad);
    document.getElementById("humedad").innerHTML = HUMEDAD + "%";
    document.getElementById("temperatura").innerHTML = TEMPERATURA + "°";


    var hoy = new Date();
    var time = hoy.getHours() + " : " + hoy.getMinutes() + " : " + hoy.getSeconds();
    mensaje = mensaje + time + " << " + message.payloadString + "\n";
    document.getElementById("mensajes").innerHTML = mensaje;
    indicador = indicador + 1;
    if (indicador == 6) {
        indicador = 0;
        mensaje = "";
    }
	
	//enviar a la BD
    var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var fecha_time = fecha + " | " + hoy.getHours() + " : " + hoy.getMinutes() + " : " + hoy.getSeconds();
    registrarMediciones(fecha_time, TEMPERATURA, 1, "activo");
    registrarMediciones(fecha_time, HUMEDAD, 2, "activo");
}

// Called when the connection is made
function onConnect() {
    console.log("conectado al broker...");
    client.subscribe("publish/data");
}

// Connect the client, providing an onConnect callback
client.connect({
    onSuccess: onConnect,
    mqttVersion: 3
});


function prenderLed() {
    console.log("Envio >> PRENDER");
    enviarMensaje("1", "state/led");
	
	var hoy = new Date();
    var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var fecha_time = fecha + " | " + hoy.getHours() + " : " + hoy.getMinutes() + " : " + hoy.getSeconds();
    registrarAccion(fecha_time, "1", 3, "ENCENDIDO");
}

function apagarLed() {
    console.log("Envio >> APAGAR");
    enviarMensaje("0", "state/led");
	
	 var hoy = new Date();
    var fecha = hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate();
    var fecha_time = fecha + " | " + hoy.getHours() + " : " + hoy.getMinutes() + " : " + hoy.getSeconds();
    registrarAccion(fecha_time, "0", 3, "APAGADO");
}

function reconfigurar() {

    var msj = document.getElementById("tiempo").value;
    console.log("Envio >> RECONFIGURAR : " + msj);
    enviarMensaje(msj, "config/publish_time");
}

function enviarMensaje(mensaje, topico) {
    // Publish a Message
    var message = new Paho.MQTT.Message(mensaje);
    message.destinationName = topico;
    message.qos = 0;
    client.send(message);
}