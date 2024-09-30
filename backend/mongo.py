from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from keys import connection_string

# Your connection string
uri = connection_string

# Create a client and connect to MongoDB
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a test ping to confirm connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


 
# Select database and collection
db = client['Flask-APP']
collection = db['Auth']

transaction_collection = db['TransactionList']


# # Insert a new user document
# user_data = {
#     "user_name": "testuser",
#     "user_password": "mypassword",
#     "user_id": 1
# }
# collection.insert_one(user_data)


# # Check if a user exists
# user = collection.find_one({"user_name": "testuser"})
# if user:
#     print("User exists:", user)
# else:
#     print("User not found.")
    
    
# # Update a user's password
# update_result = collection.update_one(
#     {"user_name": "testuser"},  # Filter
#     {"$set": {"user_password": "newpassword"}}  # Update
# )
# if update_result.modified_count > 0:
#     print("User updated successfully.")
# else:
#     print("User not found or no changes made.")
    

    
# Delete a user document
# delete_result = collection.delete_one({"user_name": "testuser"})
# if delete_result.deleted_count > 0:
#     print("User deleted successfully.")
# else:
#     print("User not found.")


#this is how changing the global varible 
#I will use it when assigning user ID's

document = {
    "username": "User1",
    "transactions": [
        {
            "id": 1,
            "text": "Grocery shopping",
            "amount": 50.75
        },
        {
            "id": 2,
            "text": "Subscription service",
            "amount": 9.99
        },
        {
            "id": 3,
            "text": "Gym membership",
            "amount": 30.00
        }
    ]
}

result = transaction_collection.insert_one(document)#to insert a list of transctions

user_transactions = transaction_collection.find_one({"username": 'User1'}) #to get a list of user transactions

for transaction in user_transactions['transactions']:
    print(f"ID: {transaction['id']}, Text: {transaction['text']}, Amount: {transaction['amount']}") #to print or access after you get
