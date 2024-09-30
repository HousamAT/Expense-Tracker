from flask import Flask, jsonify, session
from routes import auth
from flask_cors import CORS
import secrets



app = Flask(__name__)

# CORS(app,origins="*")
CORS(app, supports_credentials=True)




#to use in the session to store user  data securly
app.secret_key = secrets.token_hex(16)

# Register the blueprint
app.register_blueprint(auth, url_prefix='/auth')  # url_prefix adds a prefix to all routes in the blueprint

@app.route('/members')
def members():
    return {"members": ["member1", "member2", "member3"]}



if __name__ == '__main__':
    app.run(debug=True)