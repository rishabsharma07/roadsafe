import joblib
import pandas as pd
import shap


# LOAD MODEL
model = joblib.load(
    "ml/models/xgboost_roadsafe.pkl"
)


# LOAD LABEL ENCODERS
label_encoders = joblib.load(
    "ml/models/label_encoders.pkl"
)


# LOAD FEATURE COLUMNS
feature_columns = joblib.load(
    "ml/models/feature_columns.pkl"
)


# SHAP EXPLAINER
explainer = shap.TreeExplainer(model)


def predict_risk(data: dict):

    # CREATE DATAFRAME
    df = pd.DataFrame([data])


    # CATEGORICAL COLUMNS
    cat_cols = [

        "Weather_Conditions",
        "Road_Type",
        "Light_Conditions",
        "Road_Surface_Conditions",
        "Urban_or_Rural_Area",
        "Junction_Detail"
    ]


    # ENCODE
    for col in cat_cols:

        encoder = label_encoders[col]

        df[col] = encoder.transform(
            df[col].astype(str)
        )


    # FEATURE ORDER
    df = df[feature_columns]


    # PREDICTION
    probability = model.predict_proba(df)[0][1]


    risk_percent = float(
        round(
            float(probability) * 100,
            2
        )
    )


    # SEVERITY
    if risk_percent < 30:

        severity = "Low"

    elif risk_percent < 60:

        severity = "Medium"

    elif risk_percent < 80:

        severity = "High"

    else:

        severity = "Critical"


    # SHAP VALUES
    shap_values = explainer.shap_values(df)


    feature_scores = dict(

        zip(

            feature_columns,

            abs(shap_values[0])
        )
    )


    # REMOVE LAT/LON
    excluded = [

        "Latitude",
        "Longitude"
    ]


    filtered_scores = {

        k: v

        for k, v in feature_scores.items()

        if k not in excluded
    }


    # TOP FACTORS
    top_features = sorted(

        filtered_scores.items(),

        key=lambda x: x[1],

        reverse=True

    )[:5]


    # FORMAT
    top_factors = [

        {

            "feature": feature.replace("_", " "),

            "importance": round(
                float(score),
                3
            )
        }

        for feature, score in top_features
    ]


    return {

        "risk_probability": risk_percent,

        "severity": severity,

        "top_factors": top_factors
    }