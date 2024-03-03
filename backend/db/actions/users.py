from db.connection import DbConnection
from db.model import User
from sqlmodel import Session, select
from sqlalchemy.exc import NoResultFound

from passlib.context import CryptContext

class UserActions(DbConnection):
    def get_users(self):
        with Session(self.engine) as session:
            statement = select(User)
            result = session.exec(statement)
            users = result.all()
            return users

    def get_user(self, email: str):
        try:
            with Session(self.engine) as session:
                statement = select(User).where(User.email == email)
                result = session.exec(statement)
                user = result.one()
                return user
        except NoResultFound:
            return None
