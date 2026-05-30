# 🚦 RoadSafe AI - Intelligent Road Accident Risk Prediction System

RoadSafe AI is a full-stack machine learning application that predicts road accident risk based on environmental, weather, road, and traffic conditions. The system combines Machine Learning, Explainable AI, Live Weather Integration, Geolocation Services, Interactive Maps, and Analytics to help identify potentially dangerous road situations.

---

## 📌 Features

### 🤖 AI-Powered Risk Prediction
- XGBoost-based accident risk prediction model
- Real-time risk scoring
- Binary classification (Low Risk / High Risk)
- Accident severity estimation
- Feature-engineered input pipeline

### 🧠 Explainable AI (XAI)
- SHAP (SHapley Additive Explanations) integration
- Displays top factors contributing to predictions
- Transparent and interpretable AI decisions

### 🌤️ Live Weather Integration
- OpenWeather API integration
- Real-time weather fetching
- Automatic mapping of weather conditions to model-compatible categories
- Supports:
  - Clear weather
  - Clouds
  - Rain
  - Fog
  - Mist
  - Haze
  - Smoke
  - Snow

### 📍 Geolocation & Location Search
- Current location detection
- City/location search
- Latitude and longitude retrieval
- OpenStreetMap integration

### 🗺️ Interactive Risk Map
- Leaflet-based map visualization
- Dynamic risk markers
- Location-based accident risk display

### 📊 Analytics Dashboard
- Total predictions made
- Average risk score
- High-risk predictions count
- Most frequently analyzed city
- Monthly prediction trends
- Peak prediction hours
- Severity distribution charts

### 🗄️ Prediction History Storage
- PostgreSQL database integration
- Stores every prediction
- Tracks:
  - Location
  - Weather
  - Road conditions
  - Risk score
  - Severity
  - Timestamp

---

# 🏗️ System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
FastAPI Backend
 │
 ├── Weather API
 ├── Geolocation API
 ├── PostgreSQL
 │
 ▼
XGBoost Model
 │
 ▼
SHAP Explainability
 │
 ▼
Prediction Result
```

---

# 🧠 Machine Learning Pipeline

### Dataset

Road Accident Dataset containing:

- Weather Conditions
- Road Type
- Speed Limit
- Road Surface Conditions
- Light Conditions
- Urban/Rural Area
- Junction Details
- Location Coordinates
- Accident Severity

### Feature Engineering

Generated Features:

- Month
- Day
- Weekday
- Hour
- Peak Hour Flag
- Weekend Flag
- Night Flag

### Model

```text
XGBoost Classifier
```

### Performance Metrics

| Metric | Score |
|----------|--------|
| Accuracy | 81% |
| ROC-AUC | 79.6% |
| Precision (Class 1) | 67% |
| Recall (Class 1) | 77% |
| F1 Score (Class 1) | 71% |

### Confusion Matrix

```text
[[2921  635]
 [ 378 1267]]
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Leaflet Maps
- Recharts

## Backend

- FastAPI
- Python
- SQLAlchemy
- PostgreSQL
- Pydantic

## Machine Learning

- XGBoost
- Scikit-Learn
- Pandas
- NumPy
- SHAP
- Joblib

## APIs

- OpenWeather API
- OpenStreetMap
- Browser Geolocation API


---


# 📡 API Endpoints

## Home

```http
GET /
```

Returns API status.

---

## Predict Risk

```http
POST /predict
```

### Sample Request

```json
{
  "City": "Delhi",
  "Latitude": 28.6139,
  "Longitude": 77.2090,
  "Weather_Conditions": "Fog or mist",
  "Road_Type": "Single carriageway",
  "Light_Conditions": "Daylight",
  "Road_Surface_Conditions": "Dry",
  "Speed_limit": 60,
  "month": 5,
  "day": 25,
  "weekday": 1,
  "hour": 14,
  "is_peak_hour": 0,
  "is_weekend": 0,
  "is_night": 0
}
```

---

## Dashboard Statistics

```http
GET /dashboard-stats
```

Returns:

- Total Predictions
- Average Risk
- High Risk Count
- Top City

---

## Analytics

```http
GET /analytics
```

Returns:

- Monthly Trends
- Peak Hours
- Severity Distribution

---

## Heatmap Data

```http
GET /heatmap-data
```

Returns location-wise risk information.

---


# 👨‍💻 Author

**Rishab Sharma**
