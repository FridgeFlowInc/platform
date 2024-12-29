import datetime
import uuid

from ninja import Schema


class ProductResponse(Schema):
    id: uuid.UUID
    name: str
    category: str
    manufacturer: str
    quantity: float
    unit: str
    nutritional_value: float
    total_net_weight: float
    total_gross_weight: float
    manufacture_date: datetime.date
    expiration_date: datetime.date
    notes: str
    allergens: str


class ProductCreate(Schema):
    name: str
    category: str
    manufacturer: str
    quantity: float
    unit: str
    nutritional_value: float
    total_net_weight: float
    total_gross_weight: float
    manufacture_date: datetime.date
    expiration_date: datetime.date
    notes: str
    allergens: str


class ProductLogResponse(Schema):
    product_id: uuid.UUID
    action_type: str
    description: str
    timestamp: datetime.datetime
