from flask import Flask
from routes import auth  # Import the authentication blueprint from routes
from flask_cors import CORS  # Import Flask-CORS to handle Cross-Origin Resource Sharing

# Initialize the Flask application
app = Flask(__name__)

# Enable CORS with support for credentials (for cross-origin requests)
CORS(app, supports_credentials=True)

# Register the authentication blueprint
# The url_prefix '/auth' adds a prefix to all routes defined in the auth blueprint
app.register_blueprint(auth, url_prefix='/auth')

# Start the Flask application
if __name__ == '__main__':
    app.run(debug=True)  # Run the app in debug mode for development
