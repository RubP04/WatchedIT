import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def create_user(email, password):
    response = supabase.auth.sign_up(
        {
            "email": email,
            "password": password,
        }
    )

    session = response.get("session")

    return session.get("access_token")

def sign_user_in(email, password):
    response = supabase.auth.sign_in_with_password(
        {
            "email": email,
            "password": password,
        }
    )

    session = response.get("session")

    return session.get("access_token")