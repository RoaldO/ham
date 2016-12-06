console.debug('main script loaded');

var MQTT_SERVER='{{ MQTT_SERVER }}';
var MQTT_PORT='{{ MQTT_PORT}}';
var MQTT_CLIENTID='{{ MQTT_CLIENTID }}';

var mqtt_client = new Paho.MQTT.Client(MQTT_SERVER, Number(MQTT_PORT), MQTT_CLIENTID);

var mqtt_connected_handlers
function subscribe_mqtt_connected(event_handler) {
}

function subscribe_mqtt_message_arrived(event_handler) {
}
