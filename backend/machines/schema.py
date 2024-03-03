from pydantic import BaseModel
from datetime import datetime

class Machine(BaseModel):
    id: int
    name: str
    user: str
    address: str
    created_at: datetime


class MachineCreate(BaseModel):
    name: str
    address: str
    user: str


class MachineCreateResponse(BaseModel):
    status_code: int
    detail: str
    machine: Machine


class MachineDefaultResponse(BaseModel):
    status_code: int
    detail: str


class MachineUpdate(BaseModel):
    name: str
    address: str
