from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter

from .schema import MachineCreate, MachineUpdate, Machine
from db.actions.machines import MachinesActions

machines_router = APIRouter()

machines_db = MachinesActions()

@machines_router.get('/machines', response_model=list[Machine])
def get_machines():
    machines = machines_db.get_all_machines()
    return machines


@machines_router.post('/machines/create', status_code=201)
def machines_create(machine_data: MachineCreate):
    check_machine_name = machines_db.get_machines_by_name(machine_data.name)
    check_machine_address = machines_db.get_machines_by_address(machine_data.address)

    if check_machine_name is not None:
        return HTTPException(status_code=400, detail='Machine name already exists')

    if check_machine_address is not None:
        return HTTPException(status_code=400, detail='Machine address already exists')

    result = machines_db.create_machine(machine_data)

    if not result:
        return HTTPException(status_code=400, detail='Machine not created')

    content = {
        'status_code': 201,
        'detail': 'Machine created',
        'machine': machine_data.model_dump()
    }

    return JSONResponse(content=content, status_code=200)


@machines_router.delete('/machines/delete/{machine_name}')
def delete_machine(machine_name: str):
    result = machines_db.machine_delete(machine_name)

    if not result:
        return HTTPException(status_code=400, detail='Machine not deleted')

    content = {
        'status_code': 200,
        'detail': 'Machine deleted'
    }

    return JSONResponse(content=content, status_code=200)


@machines_router.put('/machines/update/{machine_id}')
def update_machine(machine_id: int, machine_data: MachineUpdate):
    result = machines_db.machine_update(machine_id, machine_data)

    if not result:
        return HTTPException(status_code=400, detail='Machine not updated')

    content = {
        'status_code': 200,
        'detail': 'Machine updated'
    }

    return JSONResponse(content=content, status_code=200)
