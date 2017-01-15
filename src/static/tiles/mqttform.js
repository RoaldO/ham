console.debug('mqttform tile loading');
(function ( $ ) {

    $.fn.mqttformTile = function(params) {
        var tileNode = this;
        var retainNode = $(this).find('input[name=retain]');
        var messageNode = $(this).find('input[name=message]');
        var topicNode = $(this).find('input[name=topic]');
        var qosNode = $(this).find('input[name=qos]');

        $(this).find('button.disconnect').click(function(){
            params.mqtt_client.disconnect();
        });

        $(this).find('button.reconnect').click(function(){
            connect_mqtt()
        });

        $(this).find('button.send').click(function(){
            console.info(' sending ');
            sendMessage();
        });

        function sendMessage(){
            var retained = retainNode.is(':checked');
            var messageText = messageNode.val();
            var topic = topicNode.val();
            var qos = Number(qosNode.val());
            message = new Paho.MQTT.Message(messageText);
            message.destinationName = topic;
            message.retained = retained;
            message.qos = qos;
            params.mqtt_client.send(message);
        }

        console.info('connecting mqtt client');
        function connect_mqtt() {
            params.mqtt_client.connect();
        }

        connect_mqtt();

        return this;
    };

}( jQuery ));
console.debug('mqttform tile loaded');
