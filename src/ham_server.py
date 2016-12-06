from flask import Flask, render_template
from collections import namedtuple

Tile = namedtuple('Tile', 'type title width height color properties')
Tile.__new__.__defaults__ = (None, '', 1, 1, 'black', dict())
#colors in enum

app = Flask(__name__)
app.config.MQTT_SERVER = '127.0.0.1' # remote address
app.config.MQTT_PORT = '1884'
app.config.MQTT_CLIENTID = 'webclient'
app.config.APP_STRUCTURE = \
    Tile(title="Hoofdmenu",
         properties=dict(
             tiles=[
                 Tile(type='menu', title='verlichting'),
                 Tile(type='menu', title='verwarming'),
                 Tile(type='switch', title='black', ),
                 Tile(type='switch', title='red', color="red"),
                 Tile(type='switch', title='orange', color="orange"),
                 Tile(type='switch', title='yellow', color="yellow"),
                 Tile(type='switch', title='green', color="green"),
                 Tile(type='switch', title='blue', color="blue"),
                 Tile(type='switch', title='purple', color="purple"),
                 Tile(type='switch', title='light above dining table', width=2, color="green"),
                 Tile(type='switch', title='light above coffee table', height=2, color="blue"),
                 Tile(type='debugger', title='Debugger', height=2, width=5, color="blue"),
             ])
         )

_id = 0
def reset_id():
    global _id
    _id = 0

def generate_id(type):
    global _id
    _id += 1
    return "{0}_{1}".format(type, _id)

def render_tile(tile):
    return render_template("tiles/{0}.html".format(tile.type), tile=tile, generate_id=generate_id)

@app.route('/')
def index():
    tiles = app.config.APP_STRUCTURE.properties['tiles']
    types = [tile.type for tile in tiles]
    unique_types = set(types)
    return render_template('index.html', MQTT_SERVER=app.config.MQTT_SERVER,
                                         MQTT_PORT=app.config.MQTT_PORT,
                                         MQTT_CLIENTID=app.config.MQTT_CLIENTID,
                                         render_tile=render_tile,
                                         reset_id=reset_id,
                                         title=app.config.APP_STRUCTURE.title,
                                         tiles=tiles,
                                         types=unique_types,
                           )


if __name__ == '__main__':
    app.run(debug=True)
