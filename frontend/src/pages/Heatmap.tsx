import { useEffect, useState } from 'react';

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';


interface HeatmapPoint {

  name: string;

  lat: number;

  lng: number;

  risk: number;
}


export default function Heatmap() {

  const [points, setPoints] =
    useState<HeatmapPoint[]>([]);


  useEffect(() => {

    fetch(
      'http://127.0.0.1:8000/heatmap-data'
    )
      .then((res) => res.json())

      .then((data) => {

        setPoints(data);
      });

  }, []);


  const getColor = (risk: number) => {

    if (risk >= 80) return '#ef4444';

    if (risk >= 60) return '#f97316';

    if (risk >= 40) return '#eab308';

    return '#22c55e';
  };


  return (

    <div className="space-y-5">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          AI Risk Heatmap
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Dynamic accident risk visualization using AI predictions
        </p>

      </div>


      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        <MapContainer

          center={[22.9734, 78.6569]}

          zoom={5}

          style={{
            height: '650px',
            width: '100%'
          }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {points.map((point) => (

            <CircleMarker

              key={point.name}

              center={[point.lat, point.lng]}

              radius={point.risk / 5}

              pathOptions={{

                fillColor: getColor(point.risk),

                color: getColor(point.risk),

                fillOpacity: 0.6
              }}
            >

              <Popup>

                <div className="space-y-1">

                  <h3 className="font-semibold">
                    {point.name}
                  </h3>

                  <p>
                    Risk Score:
                    {' '}
                    <span className="font-medium">
                      {point.risk}%
                    </span>
                  </p>

                </div>

              </Popup>

            </CircleMarker>

          ))}

        </MapContainer>

      </div>


      {/* LEGEND */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">

        <h3 className="font-semibold text-gray-800 mb-3">
          Risk Legend
        </h3>

        <div className="flex flex-wrap gap-4">

          <div className="flex items-center gap-2">

            <div className="w-4 h-4 rounded-full bg-green-500" />

            <span className="text-sm text-gray-600">
              Low Risk
            </span>

          </div>


          <div className="flex items-center gap-2">

            <div className="w-4 h-4 rounded-full bg-yellow-400" />

            <span className="text-sm text-gray-600">
              Medium Risk
            </span>

          </div>


          <div className="flex items-center gap-2">

            <div className="w-4 h-4 rounded-full bg-orange-500" />

            <span className="text-sm text-gray-600">
              High Risk
            </span>

          </div>


          <div className="flex items-center gap-2">

            <div className="w-4 h-4 rounded-full bg-red-500" />

            <span className="text-sm text-gray-600">
              Critical Risk
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}