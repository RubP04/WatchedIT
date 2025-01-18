import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def create_user(email, password):
    try:
        response = supabase.auth.sign_up(
            {
                "email": email,
                "password": password,
            }
        )
    except Exception as e:
        return e

    return response

def sign_user_in(email, password):
    try:
        response = supabase.auth.sign_in_with_password(
            {
                "email": email,
                "password": password,
            }
        )
    except Exception as e:
        return e

    return response