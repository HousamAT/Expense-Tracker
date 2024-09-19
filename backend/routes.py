from flask import Blueprint, request, jsonify

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from keys import connection_string

uri = connection_string

# Create a client and connect to MongoDB
client = MongoClient(uri, server_api=ServerApi('1'))

# Select database and collection
db = client['Flask-APP']
collection = db['Auth']

auth = Blueprint('auth', __name__)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() 

    # Extract the data (assumes username, email, password are required)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Basic validation
    if not username or not email or not password:
        return jsonify({'error': 'Missing data'}), 400

    
    # Check if a user exists
    user = collection.find_one({"email": email, "username": username})
    if user:
        return jsonify({'error': 'User email already exists'}), 400
    else:
        try: 
            # Insert a new user document
            user_data = {
                "username": username,
                "email": email,
                "password": password,
            }
            collection.insert_one(user_data)
            return jsonify({'message': 'User created successfully', 'username': username}), 201 
        except:
            return jsonify({'error': 'Failed to add user to the database'}), 500

#the way the signin function works is 
#if the user will enter a username or an email and a password
#check if the username exists if not check if the password exists
@auth.route("/signin", methods = ["POST"])
def signin():
    try: 
        data = request.get_json() 
        
        username = data.get('username')
        password = data.get('password')
        
        # Basic validation
        if not username or not password:
            return jsonify({'error': 'Missing data'}), 400
        
       
        user = collection.find_one({"username": username})
        userbyemail = collection.find_one({"email": username})
        if user:
            #check if the password is correct
            if user['password'] == password:
                return jsonify({'message': 'Login successful', 'username': username}), 201 
            else:
               return jsonify({'error': 'user not found please check your password or username'}), 401 
        
        elif userbyemail:
            if userbyemail['password'] == password:
                return jsonify({'message': 'Login successful'}), 201
            else:
                return jsonify({'error': 'user not found please check your password or username'}), 401
            
        #if user does not exist
        else:
            return jsonify({'error': 'user not found please check your password or username'}), 404
    except: 
        return jsonify({'error': 'an error occurred while signning in'}), 500
    
       
