(function(){
    function on_mqtt_connected() {
        //...
    }

    function on_message_arrived() {
        //...
    }

    subscribe_mqtt_connected(on_mqtt_connected);
    subscribe_mqtt_message_arrived(on_message_arrived)
})();
