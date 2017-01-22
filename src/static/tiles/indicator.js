(function ( $ ) {
    $.fn.indicatorTile = function(params) {
        var tileNode = this;
        var properties = JSON.parse($(this).find('div.data-properties').html());
        var icon = $(this).find('.field_icon');
        var channel = properties.device;

        params.mqtt_client.onMessageArrived = function(message) {
            var str = message.payloadString;
            var output = properties.values[str];
            if (output) {
                icon.attr('class', 'field_icon fa').addClass(output);
            } else {
                icon.attr('class');
            }
        };

        function connect_mqtt() {
            params.mqtt_client.connect({onSuccess: function() {
                params.mqtt_client.subscribe(channel);
            }});
        }

        connect_mqtt();
        return this;
    };
}( jQuery ));
