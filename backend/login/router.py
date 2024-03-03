from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter
from datetime import datetime, timedelta

from login.schema import User, Token
from .utils.authenticate import check_user_in_db, verify_password
from .utils.jwt import create_access_token, verify_token

login_router = APIRouter()

@login_router.post('/login')
def login(user_data: User):
    result = check_user_in_db(user_data.email)

    if result is None:
        return HTTPException(status_code=401, detail='User not authenticated')
    if not verify_password(result.password, user_data.password):
        return HTTPException(status_code=401, detail='User not authenticated')

    expire = datetime.utcnow() + timedelta(minutes=30)
    token = create_access_token(result.email, expire)

    user_session = {
        'autehnticated': True,
        'session': token,
        'expire': str(expire),
        'status_code': 200
    }

    return JSONResponse(status_code=200, content=user_session)


@login_router.post('/verify')
def verify(session: Token):
    result = verify_token(session.token)

    if result is None:
        return HTTPException(status_code=401, detail='User not authenticated')

    return JSONResponse(status_code=200, content=result)
