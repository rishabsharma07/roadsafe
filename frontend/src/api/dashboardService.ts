const API_URL = 'http://127.0.0.1:8000';

export interface DashboardStats {

  total_predictions: number;

  high_risk_zones: number;

  average_risk: number;

  model_accuracy: number;

  top_city: string;

  peak_hour: string;
}

export async function fetchDashboardStats():

Promise<DashboardStats> {

  const response = await fetch(
    `${API_URL}/dashboard-stats`
  );

  if (!response.ok) {

    throw new Error(
      'Failed to fetch dashboard stats'
    );
  }

  return response.json();
}