from flask import Flask, json, request, jsonify
from datetime import datetime,timezone
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

data = [{
    'timestamp': datetime.now(timezone.utc).isoformat(),
    'data': {
        'temperature': 23.5,
        'humidity': 76
    }
}]

@app.route('/data', methods=["GET", "POST"])
def hello():
    global data
    if request.method == "POST":
        live_data = request.get_json()
        print(live_data)
        data.append({
            "timestamp": datetime.now(timezone.utc),
            "data": live_data
        })
        return jsonify(success=True)
    elif request.method == "GET":
        return jsonify(data[-50:])

if __name__ == '__main__':
    app.run(host="0.0.0.0")