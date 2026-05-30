from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import func , extract 
from app.models.prediction import Prediction
from fastapi.middleware.cors import CORSMiddleware

from app.services.ml_service import predict_risk

from app.database.db import SessionLocal
from app.database.db import Base
from app.database.db import engine

from app.models.prediction import Prediction
app = FastAPI()
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# INPUT SCHEMA
class PredictionInput(BaseModel):

    City: str = "Unknown"
    Latitude: float
    Longitude: float

    Weather_Conditions: str
    Road_Type: str
    Light_Conditions: str
    Road_Surface_Conditions: str
    Urban_or_Rural_Area: str = "Urban"

    Junction_Detail: str = "Not at junction or within 20 metres"

    Speed_limit: float

    month: int
    day: int
    weekday: int
    hour: int

    is_peak_hour: int
    is_weekend: int
    is_night: int


# HOME ROUTE
@app.get("/")
def home():

    return {
        "message": "RoadSafe API Running"
    }


# PREDICTION ROUTE
@app.post("/predict")
def predict(data: PredictionInput):

    result = predict_risk(
        data.dict()
    )

    db = SessionLocal()

    try:

        prediction = Prediction(

            city=data.City,

            latitude=data.Latitude,

            longitude=data.Longitude,

            weather=data.Weather_Conditions,

            road_type=data.Road_Type,

            speed_limit=int(data.Speed_limit),

            risk_probability=float(
                result["risk_probability"]
            ),

            severity=result["severity"]
        )

        db.add(prediction)

        db.commit()

    finally:

        db.close()

    return result
# DASHBOARD STATS
@app.get("/dashboard-stats")
def dashboard_stats():

    db = SessionLocal()

    try:

        total_predictions = db.query(
            Prediction
        ).count()


        avg_risk = db.query(
            func.avg(
                Prediction.risk_probability
            )
        ).scalar() or 0


        high_risk = db.query(
            Prediction
        ).filter(

            Prediction.risk_probability >= 70

        ).count()


        top_city = db.query(

            Prediction.city,

            func.count(
                Prediction.id
            )

        ).group_by(

            Prediction.city

        ).order_by(

            func.count(
                Prediction.id
            ).desc()

        ).first()


        return {

            "total_predictions":
                total_predictions,

            "high_risk_zones":
                high_risk,

            "average_risk":
                round(avg_risk, 2),

            "model_accuracy":
                81,

            "top_city":

                top_city[0]
                if top_city
                else "N/A",

            "peak_hour":
                "Coming Soon"
        }

    finally:

        db.close()
# HEATMAP DATA
@app.get("/heatmap-data")
def get_heatmap_data():

    sample_locations = [

        {
            "name": "Delhi",
            "Latitude": 28.6139,
            "Longitude": 77.2090
        },

        {
            "name": "Mumbai",
            "Latitude": 19.0760,
            "Longitude": 72.8777
        },

        {
            "name": "Bangalore",
            "Latitude": 12.9716,
            "Longitude": 77.5946
        },

        {
            "name": "Hyderabad",
            "Latitude": 17.3850,
            "Longitude": 78.4867
        },

        {
            "name": "Chennai",
            "Latitude": 13.0827,
            "Longitude": 80.2707
        }
    ]


    results = []


    for city in sample_locations:

        prediction = predict_risk({

            "Latitude": city["Latitude"],

            "Longitude": city["Longitude"],

            "Weather_Conditions":
                "Fine no high winds",

            "Road_Type":
                "Single carriageway",

            "Light_Conditions":
                "Daylight",

            "Road_Surface_Conditions":
                "Dry",

            "Urban_or_Rural_Area":
                "Urban",

            "Junction_Detail":
                "Not at junction or within 20 metres",

            "Speed_limit": 120,

            "month": 5,

            "day": 19,

            "weekday": 1,

            "hour": 14,

            "is_peak_hour": 0,

            "is_weekend": 0,

            "is_night": 0
        })


        results.append({

            "name": city["name"],

            "lat": city["Latitude"],

            "lng": city["Longitude"],

            "risk":
                prediction["risk_probability"]
        })


    return results
# ANALYTICS
@app.get("/analytics")
def get_analytics():

    db = SessionLocal()

    try:

        # Monthly Trends
        monthly_data = db.query(

            extract(
                'month',
                Prediction.created_at
            ).label('month'),

            func.count(
                Prediction.id
            )

        ).group_by(

            extract(
                'month',
                Prediction.created_at
            )

        ).all()


        month_names = {

            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        }


        monthly_trends = [

            {

                "month":
                    month_names.get(
                        int(month),
                        str(month)
                    ),

                "accidents":
                    count

            }

            for month, count
            in monthly_data
        ]


        # Peak Hours

        hourly_data = db.query(

            extract(
                'hour',
                Prediction.created_at
            ).label('hour'),

            func.count(
                Prediction.id
            )

        ).group_by(

            extract(
                'hour',
                Prediction.created_at
            )

        ).all()


        peak_hours = [

            {

                "hour":
                    f"{int(hour)}:00",

                "accidents":
                    count

            }

            for hour, count
            in hourly_data
        ]


        # Severity Distribution

        severity_data = db.query(

            Prediction.severity,

            func.count(
                Prediction.id
            )

        ).group_by(

            Prediction.severity

        ).all()


        colors = {

            "Low":
                "#22c55e",

            "Medium":
                "#eab308",

            "High":
                "#f97316",

            "Critical":
                "#ef4444"
        }


        severity_distribution = [

            {

                "name":
                    severity,

                "value":
                    count,

                "color":
                    colors.get(
                        severity,
                        "#3b82f6"
                    )
            }

            for severity, count
            in severity_data
        ]


        return {

            "monthly_trends":
                monthly_trends,

            "peak_hours":
                peak_hours,

            "severity_distribution":
                severity_distribution
        }

    finally:

        db.close()