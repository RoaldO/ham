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
                     Tile(type='thermometer', title='living', color="orange",
                          properties=dict(device='devices/living-temperature/')),
                     Tile(type='thermometer', title='desired', color="orange",
                          properties=dict(device='devices/desired-temperature/')),
                     Tile(type='weather', title='yellow', color="yellow"),
                     Tile(type='indicator', title='CV', color="yellow",
                          properties=dict(device='devices/central-heating/heater/set', values=dict(On='fa-fire', Off='fa-power-off'))),
                     Tile(type='switch', title='CV', color="blue",
                          properties=dict(device='devices/central-heating/heater/on/set', values=['true', 'false'], icons=['fa-toggle-on', 'fa-toggle-off'])),
                     Tile(type='devicelist', title='Debugger',
                          height=3, width=6, color="blue",
                          properties=dict(subscribe_to='devices/#')),
                     Tile(type='debugger', title='Debugger',
                          height=3, width=5, color="blue",
                          properties=dict(subscribe_to='+')),
                     Tile(type='debugger', title='Debugger',
                          height=3, width=5, color="blue",
                          properties=dict(subscribe_to='+/+')),
                     Tile(type='mqttform', title='Debugger',
                          height=2, width=2, color="green",
                          properties=dict()),
                 ])
             )