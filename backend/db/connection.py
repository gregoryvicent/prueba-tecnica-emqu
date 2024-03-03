from sqlmodel import create_engine

class DbConnection:
    def __init__(self) -> None:
        self.engine = create_engine('sqlite:///database.db')
