from flask import Flask, render_template

app = Flask(__name__)

def render_tile(tile):
    return "tile"

@app.route('/')
def index():
    return render_template('index.html', tiles=[], render_tile=render_tile)


if __name__ == '__main__':
    app.run(debug=True)
