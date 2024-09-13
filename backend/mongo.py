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
db = client['Auth-React-Flask-App']
collection = db['Auth']

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