from flask import Flask, render_template
from collections import namedtuple

Tile = namedtuple('Tile', 'type title width height properties')

app = Flask(__name__)
app.config.APP_STRUCTURE = \
    Tile(type='menu',
        title="Hoofdmenu",
        width=0,
        height=0,
        properties=dict(
            tiles=[
                Tile(type='menu', title='verlichting', width=1, height=1, properties=dict()),
                Tile(type='menu', title='verwarming', width=1, height=1, properties=dict()),
                Tile(type='switch', title='light above dining table', width=1, height=1, properties=dict()),
            ])
        )

def render_tile(tile):
    return render_template("tiles/{0}.html".format(tile.type))

@app.route('/')
def index():
    tiles = app.config.APP_STRUCTURE.properties['tiles']
    types = [tile.type for tile in tiles]
    unique_types = set(types)
    return render_template('index.html', render_tile=render_tile,
                                         title=app.config.APP_STRUCTURE.title,
                                         tiles=tiles,
                                         types=unique_types,
                           )


if __name__ == '__main__':
    app.run(debug=True)
