from db.connection import DbConnection
from db.model import Machine
from sqlmodel import Session, select
from sqlalchemy.exc import NoResultFound

from machines.schema import MachineCreate, MachineUpdate

class MachinesActions(DbConnection):
    def get_all_machines(self):
        with Session(self.engine) as session:
            statement = select(Machine)
            result = session.exec(statement)
            machines = result.all()
            return machines

    def get_machines_by_name(self, name: str):
        try:
            with Session(self.engine) as session:
                statement = select(Machine).where(name == Machine.name)
                result = session.exec(statement)
                machines = result.one()
                return machines
        except NoResultFound:
            return None

    def get_machines_by_address(self, address: str):
        try:
            with Session(self.engine) as session:
                statement = select(Machine).where(address == Machine.address)
                result = session.exec(statement)
                machines = result.one()
                return machines
        except NoResultFound:
            return None

    def create_machine(self, machine_data: MachineCreate):
        try:
            new_machine = Machine(
                name=machine_data.name,
                address=machine_data.address,
                user=machine_data.user
            )

            session = Session(self.engine)
            session.add(new_machine)
            session.commit()

            return True
        except Exception as e:
            print(e)

            return False

    def machine_delete(self, machine_name: str):
        try:
            with Session(self.engine) as session:
                statement = select(Machine).where(Machine.name == machine_name)
                result = session.exec(statement)
                machine = result.one()
                session.delete(machine)
                session.commit()

                return True
        except NoResultFound:
            return False
        except Exception as e:
            print(e)
            return False

    def machine_update(self, id: int, new_machine_data: MachineUpdate):
        try:
            with Session(self.engine) as session:
                statement = select(Machine).where(Machine.id == id)
                result = session.exec(statement)
                machine = result.one()

                machine.name = new_machine_data.name
                machine.address = new_machine_data.address

                session.add(machine)
                session.commit()
                session.refresh(machine)

                return True
        except NoResultFound:
            return False
