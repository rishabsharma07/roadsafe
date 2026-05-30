const API_URL = 'http://127.0.0.1:8000';


export interface PredictionInput {

  City: string;
  Latitude: number;

  Longitude: number;

  Weather_Conditions: string;

  Road_Type: string;

  Light_Conditions: string;

  Road_Surface_Conditions: string;

  Speed_limit: number;

  month: number;

  day: number;

  weekday: number;

  hour: number;

  is_peak_hour: number;

  is_weekend: number;

  is_night: number;
}


export interface TopFactor {

  feature: string;

  importance: number;
}


export interface PredictionResult {

  risk_probability: number;

  severity: string;

  top_factors: TopFactor[];
}


export async function predictRisk(
  data: PredictionInput
): Promise<PredictionResult> {

  const response = await fetch(

    `${API_URL}/predict`,

    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    }
  );


  if (!response.ok) {

    throw new Error(
      'Prediction failed'
    );
  }


  return response.json();
}


export const WEATHER_OPTIONS = [

  "Fine no high winds",
  "Raining no high winds",
  "Snowing no high winds",
  "Fine + high winds",
  "Raining + high winds",
  "Fog or mist",
  "Other",
  "Unknown"
];


export const ROAD_TYPE_OPTIONS = [

  "Single carriageway",
  "Dual carriageway",
  "Roundabout",
  "One way street",
  "Slip road",
  "Unknown"
];


export const LIGHT_CONDITION_OPTIONS = [

  "Daylight",
  "Darkness - lights lit",
  "Darkness - lights unlit",
  "Darkness - no lighting",
  "Darkness - lighting unknown"
];


export const ROAD_SURFACE_OPTIONS = [

  "Dry",
  "Wet or damp",
  "Snow",
  "Frost or ice",
  "Flood over 3cm deep"
];