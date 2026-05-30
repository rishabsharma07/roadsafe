const API_URL = 'http://127.0.0.1:8000';

export interface HeatmapPoint {

  name: string;

  risk: number;

  lat: number;

  lng: number;
}

export async function fetchHeatmapData():

Promise<HeatmapPoint[]> {

  const response = await fetch(
    `${API_URL}/heatmap-data`
  );

  if (!response.ok) {

    throw new Error(
      'Failed to fetch heatmap data'
    );
  }

  return response.json();
}