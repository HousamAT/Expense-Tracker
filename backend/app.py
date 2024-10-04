# from flask import Flask, send_from_directory
# from routes import auth
# from flask_cors import CORS
# import secrets
# import os


# app = Flask(__name__)

# # CORS(app,origins="*")
# CORS(app, supports_credentials=True)


# #to use in the session to store user  data securly
# app.secret_key = secrets.token_hex(16)

# # Register the blueprint
# app.register_blueprint(auth, url_prefix='/auth')  # url_prefix adds a prefix to all routes in the blueprint

# #attempting to deploy
# frontend_folder = os.path.join(os.getcwd(), "..","frontend","build")
# print(f"Serving frontend from: {frontend_folder}")



# #serve static files from the "build" folder under the "frontend" directory
# @app.route("/", defaults={"filename": ""})
# @app.route("/<path:filename>")
# def index(filename):
#     if not filename:
#         filename = "index.html"
#     return send_from_directory(frontend_folder, filename)

# import routes

# if __name__ == '__main__':
#     app.run(debug=True)



# from flask import Flask, send_from_directory
# from flask_cors import CORS
# import os

# app = Flask(__name__, static_folder=os.path.join(os.getcwd(), "..", "frontend", "build", "static"), static_url_path="/static")

# #CORS(app, supports_credentials=True)

# # Serve React frontend from the build folder
# frontend_folder = os.path.join(os.getcwd(), "..", "frontend", "build")

# @app.route("/", defaults={"filename": ""})
# @app.route("/<path:filename>")
# def index(filename):
#     if not filename:
#         filename = "index.html"
#     return send_from_directory(frontend_folder, filename)

# @app.route("/static/<path:filename>")
# def serve_static(filename):
#     return send_from_directory(os.path.join(frontend_folder, "static"), filename)

# # Fallback for 404 errors to return React's index.html
# @app.errorhandler(404)
# def not_found(e):
#     return send_from_directory(frontend_folder, "index.html")
# import routes

# if __name__ == "__main__":
#     app.run(debug=True)




from flask import Flask, send_from_directory
from routes import auth
from flask_cors import CORS
import secrets
import os


app = Flask(__name__)

# CORS(app,origins="*")
CORS(app, supports_credentials=True)


#to use in the session to store user  data securly
app.secret_key = secrets.token_hex(16)

# Register the blueprint
app.register_blueprint(auth, url_prefix='/auth')  # url_prefix adds a prefix to all routes in the blueprint

#attempting to deploy
frontend_folder = os.path.join(os.getcwd(), "..","frontend","build")
print(f"Serving frontend from: {frontend_folder}")



#serve static files from the "build" folder under the "frontend" directory
@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(frontend_folder, filename)

import routes

if __name__ == '__main__':
    app.run(debug=True)
