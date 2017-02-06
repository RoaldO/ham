(function ( $ ) {
    $.fn.devicelistTile = function(params) {
        var tileNode = this;
        var properties = JSON.parse($(this).find('div.data-properties').html());
        var table = $(this).find('table').dataTable({
            columns: [
                { data: 'online',
                  defaultContent: ' ',
                  render:function(a, b, c) {
                    if (a=='true') {
                        return '<i class="fa fa-plug"></i>';
                    }
                    return '';
                  }
                },
                { data: 'name', defaultContent:' '},
                { data: 'fwname', defaultContent:' '},
                { data: 'fwversion', defaultContent:' '},
                { data: 'localip', defaultContent:' '},
                { data: 'uptime', defaultContent:' '},
                { data: 'battery', defaultContent:' '},
                { data: 'signal', defaultContent:' '}
            ],
            data: []
        });
        var channel = properties.subscribe_to;

        var table_data_dict = {};


        params.mqtt_client.onMessageArrived = function(message) {
            var dst = message._getDestinationName();
            var dst_parts = dst.split('/');
            var last_part = dst_parts.pop();
            var id = dst_parts.join("/");

            function map_prop(prop) {
                if (last_part == '$' + prop) {
                    if (!table_data_dict[id]) {
                        table_data_dict[id] = {}
                    }
                    table_data_dict[id][prop] = message.payloadString;
                }
            }
            var props = 'fwname fwversion localip name online signal uptime'.split(' ');
            for (idx in props) {
                var prop = props[idx];
                map_prop(prop);
            }

            table.fnClearTable();
            for (key in table_data_dict) {
                var value = table_data_dict[key];
                table.fnAddData(value);
            }

            console.error(last_part);
            console.warn(table_data_dict);
            /*
             */

            /* update table_data */
            /* werk de tabel bij */
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
