import { useEffect, useState } from 'react';

import {
  AlertTriangle,
  MapPin,
  Activity,
  TrendingUp,
  Loader
} from 'lucide-react';

import StatCard from '../components/StatCard';

import RiskBadge from '../components/RiskBadge';

import {
  fetchDashboardStats
} from '../api/dashboardService';

import {
  fetchHeatmapData
} from '../api/heatmapService';

function getRiskColor(risk: number) {

  if (risk >= 80) return 'bg-red-500';

  if (risk >= 60) return 'bg-orange-400';

  if (risk >= 40) return 'bg-yellow-400';

  return 'bg-green-500';
}

function getRiskLabel(risk: number) {

  if (risk >= 80) return 'Critical';

  if (risk >= 60) return 'High';

  if (risk >= 40) return 'Medium';

  return 'Low';
}

export default function Dashboard() {

  const [stats, setStats] = useState<any>(null);

  const [districts, setDistricts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const statsData =
          await fetchDashboardStats();

        const heatmapData =
          await fetchHeatmapData();

        setStats(statsData);

        setDistricts(heatmapData);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    loadDashboard();

  }, []);

  const topDistricts =
    [...districts]
      .sort((a, b) => b.risk - a.risk)
      .slice(0, 8);

  if (loading) {

    return (

      <div className="flex items-center justify-center h-[70vh]">

        <div className="flex items-center gap-3 text-gray-600">

          <Loader
            size={22}
            className="animate-spin"
          />

          <span className="text-lg">
            Loading dashboard...
          </span>

        </div>

      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* Header */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Real-time road accident analytics and hotspot monitoring
        </p>

      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <StatCard
          label="Total Predictions"
          value={stats?.total_predictions}
          sub="AI predictions generated"
          icon={<AlertTriangle size={18} />}
          accent="red"
        />

        <StatCard
          label="High Risk Zones"
          value={stats?.high_risk_zones}
          sub="Districts flagged"
          icon={<MapPin size={18} />}
          accent="orange"
        />

        <StatCard
          label="Average Risk"
          value={`${stats?.average_risk}%`}
          sub="Across all monitored zones"
          icon={<Activity size={18} />}
          accent="yellow"
        />

        <StatCard
          label="Model Accuracy"
          value={`${stats?.model_accuracy}%`}
          sub="Current ML performance"
          icon={<TrendingUp size={18} />}
          accent="blue"
        />

      </div>

      {/* Top Districts */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

        <div className="px-4 py-3 border-b border-gray-200">

          <h2 className="text-sm font-semibold text-gray-800">
            Top High-Risk Districts
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Ranked using predicted accident risk score
          </p>

        </div>

        <div className="p-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {
              topDistricts.map((d) => (

                <div
                  key={d.name}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded"
                >

                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${getRiskColor(d.risk)}`}
                  />

                  <div className="flex-1 min-w-0">

                    <p className="text-sm font-medium text-gray-800">
                      {d.name}
                    </p>

                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">

                      <div
                        className={`h-2 rounded-full ${getRiskColor(d.risk)}`}
                        style={{
                          width: `${d.risk}%`
                        }}
                      />

                    </div>

                  </div>

                  <div className="text-right flex-shrink-0">

                    <p className="text-sm font-bold text-gray-900">
                      {d.risk}%
                    </p>

                    <RiskBadge
                      severity={getRiskLabel(d.risk)}
                      size="sm"
                    />

                  </div>

                </div>
              ))
            }

          </div>

        </div>

      </div>

      {/* Risk Legend */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">

        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Risk Level Legend
        </h3>

        <div className="flex flex-wrap gap-4">

          {
            [
              {
                label: 'Low (0–39%)',
                color: 'bg-green-500'
              },

              {
                label: 'Medium (40–59%)',
                color: 'bg-yellow-400'
              },

              {
                label: 'High (60–79%)',
                color: 'bg-orange-400'
              },

              {
                label: 'Critical (80–100%)',
                color: 'bg-red-500'
              },
            ].map((item) => (

              <div
                key={item.label}
                className="flex items-center gap-2"
              >

                <span
                  className={`w-3 h-3 rounded-full inline-block ${item.color}`}
                />

                <span className="text-xs text-gray-600">
                  {item.label}
                </span>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}