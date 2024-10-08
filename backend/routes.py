from flask import Blueprint, request, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from keys import connection_string

# Set MongoDB connection URI
uri = connection_string

# Create a MongoDB client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Select the database and collections
db = client['Flask-APP']
collection = db['Auth']
transaction_collection = db['TransactionList']

# Create a Blueprint for the authentication routes
auth = Blueprint('auth', __name__)

# Route for user signup
#When called it will insert a new user with the credentials 
#to the database collection on MongoDB. 
#It will also create a list of dummy transactions for the user
@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Parse the incoming JSON request

    # Extract required fields (username, password)
    username = data.get('username')
    password = data.get('password')

    # Basic validation to check if username and password are provided
    if not username or not password:
        return jsonify({'error': 'Missing data'}), 400

    # Check if the username already exists in the database
    user = collection.find_one({"username": username})
    if user:
        return jsonify({'error': 'Username already exists'}), 400
    else:
        try:
            # Create a new user document
            user_data = {
                "username": username,
                "password": password,
            }
            collection.insert_one(user_data)

            # Create dummy transactions for the new user
            dummy_transaction_1 = {'id': 1, 'text': "Travel", 'amount': -1000}
            dummy_transaction_2 = {'id': 2, 'text': "Groceries", 'amount': -300}
            dummy_transaction_3 = {'id': 3, 'text': "Books", 'amount': -150}
            dummy_transaction_4 = {'id': 4, 'text': "Salary", 'amount': 1500}

            # Insert dummy transactions into the transaction collection
            transaction_collection.insert_one({
                'username': username,
                'transactions': [dummy_transaction_1, dummy_transaction_2, dummy_transaction_3, dummy_transaction_4]
            })

            return jsonify({'message': 'User created successfully', 'username': username}), 201
        except Exception as e:
            return jsonify({'error': 'Failed to add user to the database', 'details': str(e)}), 500

# Route for user sign-in
#It will check MongoDB Collection to find the instance of a user.
@auth.route("/signin", methods=["POST"])
def signin():
    try:
        data = request.get_json()  # Parse the incoming JSON request

        # Extract username and password from the request
        username = data.get('username')
        password = data.get('password')

        # Basic validation
        if not username or not password:
            return jsonify({'error': 'Missing data'}), 400

        # Check if the username exists in the database
        user = collection.find_one({"username": username})
        if user:
            # Verify if the password is correct
            if user['password'] == password:
                return jsonify({'message': 'Login successful', 'username': username}), 201
            else:
                return jsonify({'error': 'Incorrect username or password'}), 401
        else:
            return jsonify({'error': 'Incorrect username or password'}), 404
    except:
        return jsonify({'error': 'An error occurred while signing in'}), 500

# Route for user logout (To be implemented)
@auth.route('/logout', methods=['POST'])
def logout():
    return jsonify({'message': 'Logged out successfully'}), 200

# Route to fetch user transactions
#Gets the user transactions from the MongoDB Database
@auth.route('/transactions', methods=['GET'])
def get_transactions():
    username = request.args.get('username')  # Get username from query parameters

    if not username:
        return jsonify({'error': 'Username not provided'}), 400

    # Fetch transactions for the given username
    user_transactions = transaction_collection.find_one({'username': username})

    # Check if the user has transactions
    if user_transactions and 'transactions' in user_transactions:
        transactions = user_transactions['transactions']  # List of transactions

        # Return transactions in JSON format
        return jsonify([{'id': t['id'], 'text': t['text'], 'amount': t['amount']} for t in transactions])
    else:
        # Return empty list if no transactions are found
        return jsonify([]), 404

# Route to add a new transaction for a user
#It will add a new transaction to list of transactions
#in the user's MongoDB collection. 
@auth.route('/addtransactions', methods=['POST'])
def add_transaction():
    username = request.args.get('username')  # Get username from query parameters

    if not username:
        return jsonify({'error': 'Username not provided'}), 400

    # Fetch user transactions from the database
    user_transactions = transaction_collection.find_one({'username': username})

    if not user_transactions:
        return jsonify({'error': 'User not found'}), 404

    # Parse the new transaction from the request body
    data = request.get_json()
    new_transaction = {
        'id': data['id'],
        'text': data['text'],
        'amount': data['amount']
    }

    # Append the new transaction to the user's transaction list
    transaction_collection.update_one(
        {'username': username},
        {'$push': {'transactions': new_transaction}}
    )

    return jsonify(new_transaction), 201

# Route to delete a specific transaction
#It will delete transaction from the user's MongoDB collection
#based on the transaction ID that's passed. 
@auth.route('/deletetransaction', methods=['DELETE'])
def delete_transaction():
    username = request.args.get('username')  # Get username from query parameters
    transaction_id = request.args.get('id')  # Get transaction ID from query parameters

    if not username or not transaction_id:
        return jsonify({'error': 'Username or transaction ID not provided'}), 400

    # Convert transaction ID to an integer
    try:
        transaction_id = int(transaction_id)
    except ValueError:
        return jsonify({'error': 'Invalid transaction ID format'}), 400

    # Remove the transaction from the user's transaction list
    result = transaction_collection.update_one(
        {'username': username},
        {'$pull': {'transactions': {'id': transaction_id}}}
    )

    if result.modified_count == 0:
        return jsonify({'error': 'Transaction not found or not deleted'}), 404

    return jsonify({'message': 'Transaction deleted successfully'}), 200

# Route to update a specific transaction
# Updated a transaction in the the user's MongoDB database collection
#based on the transaction id. 
@auth.route('/updatetransaction', methods=['PUT'])
def update_transaction():
    username = request.args.get('username')  # Get username from query parameters
    transaction_id = request.json.get('id')  # Get transaction ID from request body
    new_amount = request.json.get('amount')  # Get new amount from request body
    new_category = request.json.get('text')  # Get new category from request body

    # Convert transaction ID to an integer
    try:
        transaction_id = int(transaction_id)
    except ValueError:
        return jsonify({'error': 'Invalid transaction ID format'}), 400

    # Update the transaction in the database
    result = transaction_collection.update_one(
        {'username': username, 'transactions.id': transaction_id},
        {'$set': {'transactions.$.amount': new_amount, 'transactions.$.text': new_category}}
    )

    if result.modified_count == 0:
        return jsonify({'error': 'Transaction not found or not updated'}), 404

    return jsonify({'message': 'Transaction updated successfully'}), 200
