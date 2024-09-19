from flask import Flask, jsonify
from routes import auth
from flask_cors import CORS

app = Flask(__name__)

CORS(app,origins="*")

# Register the blueprint
app.register_blueprint(auth, url_prefix='/auth')  # url_prefix adds a prefix to all routes in the blueprint

@app.route('/members')
def members():
    return {"members": ["member1", "member2", "member3"]}



if __name__ == '__main__':
    app.run(debug=True)