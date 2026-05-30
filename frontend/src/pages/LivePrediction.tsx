import { useState } from 'react';

import {
  AlertTriangle,
  Loader2,
  MapPin,
  ShieldAlert,
  LocateFixed,
  CloudRain
} from 'lucide-react';

import RiskBadge from '../components/RiskBadge';

import {
  predictRisk,

  WEATHER_OPTIONS,
  ROAD_TYPE_OPTIONS,
  LIGHT_CONDITION_OPTIONS,
  ROAD_SURFACE_OPTIONS,

  PredictionResult

} from '../api/predictionService';

import {
  fetchWeather
} from '../api/weatherService';


export default function LivePrediction() {

  const [loading, setLoading] =
    useState(false);

  const [location, setLocation] =
    useState('');

  const [result, setResult] =
    useState<PredictionResult | null>(null);


  const [formData, setFormData] = useState({

    Latitude: 28.6139,

    Longitude: 77.2090,

    Weather_Conditions:
      WEATHER_OPTIONS[0],

    Road_Type:
      ROAD_TYPE_OPTIONS[0],

    Light_Conditions:
      LIGHT_CONDITION_OPTIONS[0],

    Road_Surface_Conditions:
      ROAD_SURFACE_OPTIONS[0],

    Speed_limit: 60,
  });


  const inputStyle =
    'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500';


  // CURRENT LOCATION
  const handleCurrentLocation = () => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;


        const weather =
          await fetchWeather(
            lat,
            lon
          );


        setFormData((prev) => ({

          ...prev,

          Latitude: lat,

          Longitude: lon,

          Weather_Conditions:
            weather
        }));


        setLocation(
          'Current Location'
        );
      },

      (error) => {

        console.error(error);

        alert(
          'Unable to fetch location'
        );
      }
    );
  };


  // SEARCH LOCATION
  const handleSearchLocation =
    async () => {

      if (!location.trim()) return;

      try {

        const response =
          await fetch(

            `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
          );

        const data =
          await response.json();


        if (data.length === 0) {

          alert(
            'Location not found'
          );

          return;
        }


        const lat = parseFloat(
          data[0].lat
        );

        const lon = parseFloat(
          data[0].lon
        );


        const weather =
          await fetchWeather(
            lat,
            lon
          );


        setFormData((prev) => ({

          ...prev,

          Latitude: lat,

          Longitude: lon,

          Weather_Conditions:
            weather
        }));

      } catch (error) {

        console.error(error);

        alert(
          'Location search failed'
        );
      }
    };


  // PREDICT
  const handlePredict =
    async () => {

      try {

        setLoading(true);

        const now =
          new Date();

        const hour =
          now.getHours();

        const weekday =
          now.getDay();

        const month =
          now.getMonth() + 1;

        const day =
          now.getDate();


        const payload = {

          City: location,
          ...formData,

          month,

          day,

          weekday,

          hour,

          is_peak_hour:

            (
              hour >= 7 &&
              hour <= 10
            ) ||

            (
              hour >= 17 &&
              hour <= 20
            )

              ? 1
              : 0,

          is_weekend:

            weekday === 0 ||
            weekday === 6

              ? 1
              : 0,

          is_night:

            hour >= 20 ||
            hour <= 5

              ? 1
              : 0,
        };


        const response =
          await predictRisk(
            payload
          );


        setResult(response);

      } catch (error) {

        console.error(error);

        alert(
          'Prediction failed'
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div className="space-y-6">

      {/* HEADER */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Live Accident Risk Prediction
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Predict road accident risk using AI-powered road analysis
        </p>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* LEFT PANEL */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

          <div className="flex items-center gap-2 mb-5">

            <MapPin
              className="text-blue-600"
              size={20}
            />

            <h2 className="font-semibold text-gray-800">
              Road & Environment Details
            </h2>

          </div>


          {/* LOCATION */}
          <div className="mb-5">

            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Location
            </label>

            <div className="flex gap-2">

              <input
                type="text"
                placeholder="Search city or place..."
                className={inputStyle}
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              />


              <button
                onClick={
                  handleSearchLocation
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg text-sm"
              >
                Search
              </button>


              <button
                onClick={
                  handleCurrentLocation
                }
                className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-lg text-sm flex items-center gap-1"
              >

                <LocateFixed
                  size={16}
                />

                Current

              </button>

            </div>

          </div>


          {/* FORM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


            {/* WEATHER */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Live Weather
              </label>

              <div className="relative">

                <CloudRain
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  type="text"
                  value={
                    formData.Weather_Conditions
                  }
                  readOnly
                  className={`${inputStyle} pl-9 bg-gray-50`}
                />

              </div>

            </div>


            {/* ROAD TYPE */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Road Type
              </label>

              <select
                className={inputStyle}
                value={
                  formData.Road_Type
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    Road_Type:
                      e.target.value
                  })
                }
              >

                {ROAD_TYPE_OPTIONS.map(
                  (option) => (

                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* LIGHT */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Light Conditions
              </label>

              <select
                className={inputStyle}
                value={
                  formData.Light_Conditions
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    Light_Conditions:
                      e.target.value
                  })
                }
              >

                {LIGHT_CONDITION_OPTIONS.map(
                  (option) => (

                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* ROAD SURFACE */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Road Surface
              </label>

              <select
                className={inputStyle}
                value={
                  formData.Road_Surface_Conditions
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    Road_Surface_Conditions:
                      e.target.value
                  })
                }
              >

                {ROAD_SURFACE_OPTIONS.map(
                  (option) => (

                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* SPEED */}
            <div>

              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Speed Limit
              </label>

              <input
                type="number"
                className={inputStyle}
                value={
                  formData.Speed_limit
                }
                onChange={(e) =>
                  setFormData({

                    ...formData,

                    Speed_limit:
                      Number(
                        e.target.value
                      )
                  })
                }
              />

            </div>

          </div>


          {/* BUTTON */}
          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition"
          >

            {loading ? (

              <span className="flex items-center justify-center gap-2">

                <Loader2
                  className="animate-spin"
                  size={18}
                />

                Predicting...

              </span>

            ) : (

              'Predict Risk'

            )}

          </button>

        </div>


        {/* RIGHT PANEL */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

          <div className="flex items-center gap-2 mb-5">

            <ShieldAlert
              className="text-red-500"
              size={20}
            />

            <h2 className="font-semibold text-gray-800">
              Prediction Result
            </h2>

          </div>


          {!result ? (

            <div className="h-full flex flex-col items-center justify-center text-center py-16">

              <AlertTriangle
                size={48}
                className="text-gray-300"
              />

              <p className="mt-4 text-sm text-gray-500">
                Enter road conditions and run prediction
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {/* SCORE */}
              <div className="text-center">

                <p className="text-sm text-gray-500">
                  Accident Risk Probability
                </p>

                <h1 className="text-5xl font-bold text-gray-900 mt-2">

                  {result.risk_probability}%

                </h1>

              </div>


              {/* BADGE */}
              <div className="flex justify-center">

                <RiskBadge
                  severity={
                    result.severity
                  }
                />

              </div>


              {/* FACTORS */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">

                <h3 className="font-medium text-gray-800 mb-3">
                  Top Risk Factors
                </h3>

                <div className="space-y-3">

                  {result.top_factors.map(
                    (factor) => (

                      <div
                        key={
                          factor.feature
                        }
                      >

                        <div className="flex justify-between text-sm mb-1">

                          <span className="text-gray-700">

                            {factor.feature}

                          </span>

                          <span className="font-medium text-gray-900">

                            {(
                              factor.importance * 100
                            ).toFixed(1)}%

                          </span>

                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">

                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width:
                                `${factor.importance * 100}%`
                            }}
                          />

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}