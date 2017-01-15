(function ( $ ) {
    $.fn.thermometerTile = function(params) {
        var tileNode = this;
        var properties = JSON.parse($(this).find('div.data-properties').html());
        var output = $(this).find('.field_temperature');
        var bulb = $(this).find('.field_bulb');
        var channel = properties.device + 'temperature/temperature';

        params.mqtt_client.onMessageArrived = function(message) {
            output.text(message.payloadString.slice(0, -1));
            var temp = Number(message.payloadString)
            bulb.removeClass('fa-thermometer-0')
            bulb.removeClass('fa-thermometer-1')
            bulb.removeClass('fa-thermometer-2')
            bulb.removeClass('fa-thermometer-3')
            bulb.removeClass('fa-thermometer-4')
            if (temp < 17) {
                bulb.addClass('fa-thermometer-0')
            } else {
                if (temp < 19) {
                    bulb.addClass('fa-thermometer-1')
                } else {
                    if (temp < 11) {
                        bulb.addClass('fa-thermometer-2')
                    } else {
                        if (temp < 23) {
                            bulb.addClass('fa-thermometer-3')
                        } else {
                            bulb.addClass('fa-thermometer-4')
                        }
                    }
                }
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
