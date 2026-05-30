from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database.db import Base


class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    city = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    weather = Column(String)

    road_type = Column(String)

    speed_limit = Column(Integer)

    risk_probability = Column(Float)

    severity = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )