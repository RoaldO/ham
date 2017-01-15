from ham import Tile

def set_config(config):
    config.MQTT_SERVER = '192.168.1.22'
    config.MQTT_PORT = '1884'
    config.MQTT_CLIENTID = 'webclient'
    config.APP_STRUCTURE = \
        Tile(title="Hoofdmenu",
             properties=dict(
                 tiles=[
                     Tile(type='menu', title='sub menu'),
                     Tile(type='switch', title='red', color="red"),
                     Tile(type='thermometer', title='orange', color="orange",
                          properties=dict(device='devices/living-temperature/')),
                     Tile(type='weather', title='yellow', color="yellow"),
                     Tile(type='switch', title='blue', width=2, color="blue"),
                     Tile(type='switch', title='purple', color="purple"),
                     Tile(type='debugger', title='Debugger',
                          height=2, width=4, color="blue",
                          properties=dict(subscribe_to='#')),
                     Tile(type='mqttform', title='Debugger',
                          height=2, width=2, color="green",
                          properties=dict()),
                 ])
             )