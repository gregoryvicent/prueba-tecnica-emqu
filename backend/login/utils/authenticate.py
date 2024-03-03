from db.actions.users import UserActions
from passlib.context import CryptContext

def check_user_in_db(email: str):
    user_actions = UserActions()
    user = user_actions.get_user(email=email)

    return user


def verify_password(password_hash: str, password_plain: str) -> bool:
    pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
    password = pwd_context.verify(password_plain, password_hash)

    return password
