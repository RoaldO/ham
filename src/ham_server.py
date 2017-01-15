from flask import Flask, render_template
from collections import namedtuple
import json

app = Flask(__name__)

# config
import default_config
default_config.set_config(app.config)
try:
    import site_config
    site_config.set_config(app.config)
except:
    print('Warning: No `site_config.py` found. Create one by copying `default_config.py` and customizing it.' )

# initialisation of config
_id = 0
def reset_id():
    global _id
    _id = 0

# render helpers
def generate_id(type):
    global _id
    _id += 1
    return "{0}_{1}".format(type, _id)

def to_json(obj):
    return json.dumps(obj)

def render_tile(tile):
    return render_template("tiles/{0}.html".format(tile.type), tile=tile, generate_id=generate_id, to_json=to_json)

# url mapping
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
