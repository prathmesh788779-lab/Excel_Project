from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Event Enquiry Models
class EventEnquiryCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    event_type: str
    event_date: str
    guest_count: Optional[str] = None
    message: Optional[str] = None

class EventEnquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    event_type: str
    event_date: str
    guest_count: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Contact Enquiry Models
class ContactEnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class ContactEnquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Routes
@api_router.get("/")
async def root():
    return {"message": "Silver Stone Park Resort API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Event Enquiry Routes
@api_router.post("/enquiries/event", response_model=EventEnquiry)
async def create_event_enquiry(input: EventEnquiryCreate):
    enquiry_dict = input.model_dump()
    enquiry_obj = EventEnquiry(**enquiry_dict)
    doc = enquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    _ = await db.event_enquiries.insert_one(doc)
    return enquiry_obj

@api_router.get("/enquiries/event", response_model=List[EventEnquiry])
async def get_event_enquiries():
    enquiries = await db.event_enquiries.find({}, {"_id": 0}).to_list(1000)
    for enquiry in enquiries:
        if isinstance(enquiry.get('created_at'), str):
            enquiry['created_at'] = datetime.fromisoformat(enquiry['created_at'])
    return enquiries

# Contact Enquiry Routes
@api_router.post("/enquiries/contact", response_model=ContactEnquiry)
async def create_contact_enquiry(input: ContactEnquiryCreate):
    enquiry_dict = input.model_dump()
    enquiry_obj = ContactEnquiry(**enquiry_dict)
    doc = enquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    _ = await db.contact_enquiries.insert_one(doc)
    return enquiry_obj

@api_router.get("/enquiries/contact", response_model=List[ContactEnquiry])
async def get_contact_enquiries():
    enquiries = await db.contact_enquiries.find({}, {"_id": 0}).to_list(1000)
    for enquiry in enquiries:
        if isinstance(enquiry.get('created_at'), str):
            enquiry['created_at'] = datetime.fromisoformat(enquiry['created_at'])
    return enquiries

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
