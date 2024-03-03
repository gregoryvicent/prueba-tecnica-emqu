from pydantic import BaseModel

class User(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    token: str


class UserSession(BaseModel):
    authenticated: bool
    session: str
    expire: str
    status_code: int


class VerifiedSession(BaseModel):
    sub: str
    exp: int