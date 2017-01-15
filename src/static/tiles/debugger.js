console.debug('debugger tile loading');
(function ( $ ) {

    $.fn.debuggerTile = function(params) {
        var tileNode = this;
        var output = $(this).find('table tbody');

        function clear_output() {
            output.empty()
        }

        $(this).find('button.disconnect').click(function(){
            params.mqtt_client.disconnect();
            clear_output()
        });

        $(this).find('button.reconnect').click(function(){
            connect_mqtt()
        });

        active_data = {};
        function render_clear_output() {
            console.log(active_data);
            for (var f in active_data) {
                var v = active_data[f];
                var tr = $('<tr></tr>')
                $('<th></th>').text(f).appendTo(tr);
                $('<td></td>').text(v).appendTo(tr);
                tr.appendTo(output);
            }
        }

        params.mqtt_client.onMessageArrived = function(message) {
            active_data[message.destinationName] = message.payloadString;
            clear_output();
            render_clear_output();
        };

        console.info('connecting mqtt client');
        function connect_mqtt() {
            params.mqtt_client.connect({onSuccess: function() {
                console.info('subscribing to topic');
                params.mqtt_client.subscribe("#");
            }});
        }

        connect_mqtt();

        return this;
    };

}( jQuery ));
console.debug('debugger tile loaded');
