from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/submitXY', methods=['POST'])
def submitXY():
    X = {}
    Y = {}
    if (request.is_json):
        req_data = request.get_json()

        X = req_data['X']
        Y = req_data['Y']
        XY = {'X': X, 'Y': Y}
        # print(X)

    return jsonify(XY)
