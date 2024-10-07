from flask import Flask
from routes import auth
from flask_cors import CORS


app = Flask(__name__)

# CORS(app,origins="*")
CORS(app, supports_credentials=True)


# Register the blueprint
app.register_blueprint(auth, url_prefix='/auth')  # url_prefix adds a prefix to all routes in the blueprint


if __name__ == '__main__':
    app.run(debug=True)