import psycopg2
from dotenv import load_dotenv
import os
from urllib.parse import urlparse, unquote

# Load environment variables from .env
load_dotenv()

# Fetch DATABASE_URL from .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Parse the DATABASE_URL
parsed_url = urlparse(DATABASE_URL)

# Extract credentials, decoding the password
USER = parsed_url.username
PASSWORD = unquote(parsed_url.password)  # Decodes %23 back to #
HOST = parsed_url.hostname
PORT = parsed_url.port
DBNAME = parsed_url.path[1:]  # Remove the leading '/' from the path

# Connect to the database
try:
    connection = psycopg2.connect(
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        dbname=DBNAME
    )
    print("Connection successful!")
    
    # Create a cursor to execute SQL queries
    cursor = connection.cursor()
    
    # Example query
    cursor.execute("SELECT NOW();")
    result = cursor.fetchone()
    print("Current Time:", result)

    # Close the cursor and connection
    cursor.close()
    connection.close()
    print("Connection closed.")

except Exception as e:
    print(f"Failed to connect: {e}")
