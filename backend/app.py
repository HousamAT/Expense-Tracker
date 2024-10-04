
from flask import Flask, send_from_directory
from routes import auth
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend/build')  # Serve the React app from the 'build' folder

# CORS to allow frontend-backend communication
CORS(app, supports_credentials=True)


# Register the blueprint
app.register_blueprint(auth, url_prefix='/auth')  # Flask API routes

# Serve React app's static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path != '' and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)  # Serve the file if it exists
    else:
        return send_from_directory(app.static_folder, 'index.html')  # Fallback to React's index.html


if __name__ == '__main__':
    app.run()
