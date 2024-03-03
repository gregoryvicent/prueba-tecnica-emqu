from jose import jwt, JWTError

SECRETE_KEY = 'ec8477677ba287d2321b65d3a052e6c894f74ffed8d54bd96b44e845925d4259'
ALGORITHM = 'HS256'

def create_access_token(email: str, expire: str):
    token_data = {'sub': email, 'exp': expire}
    encode_jwt = jwt.encode(token_data, SECRETE_KEY, algorithm=ALGORITHM)

    return encode_jwt


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRETE_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None