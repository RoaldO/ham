(function ( $ ) {
    $.fn.switchTile = function(params) {
        var icon = $('i', this);
        var properties = JSON.parse($(this).find('div.data-properties').html());
        var values = properties.values;
        var channel = properties.device || '';

        var current_idx = null;

        on_click = function (event) {
            var new_index = current_idx;
            if (new_index == null) {
                new_index = 0;
            } else {
                new_index++;
                console.warn(new_index);
            }
            console.warn(values.length);
            if (new_index == values.length) {
                new_index = 0;
            }
            var new_str = values[new_index];
            sendMessage(new_str)
        }

        function sendMessage(msg){
            message = new Paho.MQTT.Message(msg);
            message.destinationName = channel;
            message.retained = true;
            message.qos = 2;
            params.mqtt_client.send(message);
            console.warn(' DONE' );
        }

        params.mqtt_client.onMessageArrived = function(message) {
            var str = message.payloadString;
            var idx = values.indexOf(str);
            var output = properties.icons[idx];

            if (idx >= 0) {
                icon.attr('class', 'field_icon fa').addClass(output);
                current_idx = idx;
            } else {
                icon.attr('class', ' ');
                current_idx = null;
            }
        };

        function connect_mqtt() {
            params.mqtt_client.connect({onSuccess: function() {
                params.mqtt_client.subscribe(channel);
            }});
        }

        connect_mqtt();

        icon.click(on_click);
        return this;

    };
}( jQuery ));
