import numpy as np
import matplotlib.pyplot as plt
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

@app.route('/api/polyfit', methods=['POST'])
def polyfit():
    X = {}
    Y = {}
    if (request.is_json):
        req_data = request.get_json()

        X = req_data['X']
        Y = req_data['Y']
        degree = req_data['degree']

        x = np.array(X)
        y = np.array(Y)
        poly = np.polyfit(x, y, degree)

        # Debug
        if (False):
            plt.plot(x,y,'o')
            plt.plot(x,np.polyval(poly,x),'r-')
            plt.show()
            print(poly)

    return jsonify(poly.tolist())