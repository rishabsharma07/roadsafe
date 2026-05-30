import { useEffect, useState } from 'react';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import { fetchAnalyticsData } from '../api/analyticsService';


function ChartCard({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {

  return (

    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">

      <div className="px-4 py-3 border-b border-gray-200">

        <h2 className="text-sm font-semibold text-gray-800">
          {title}
        </h2>

        {
          subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">
              {subtitle}
            </p>
          )
        }

      </div>

      <div className="p-4">
        {children}
      </div>

    </div>
  );
}


const CustomTooltipStyle = {
  fontSize: '12px',
  borderRadius: '6px',
  border: '1px solid #e5e7eb'
};


export default function Analytics() {

  const [accidentTrendData, setAccidentTrendData] = useState<any[]>([]);

  const [peakHourData, setPeakHourData] = useState<any[]>([]);

  const [severityData, setSeverityData] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        const data = await fetchAnalyticsData();

        setAccidentTrendData(data.monthly_trends);

        setPeakHourData(data.peak_hours);

        setSeverityData(data.severity_distribution);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    loadAnalytics();

  }, []);


  if (loading) {

    return (

      <div className="flex items-center justify-center h-[60vh]">

        <p className="text-gray-500 text-sm">
          Loading analytics...
        </p>

      </div>
    );
  }


  const summaryCards = [

    {
      label: 'Total Records',

      value: accidentTrendData.reduce(
        (sum, item) => sum + item.accidents,
        0
      )
    },

    {
      label: 'Avg / Month',

      value:
        accidentTrendData.length > 0
          ? Math.round(
              accidentTrendData.reduce(
                (sum, item) => sum + item.accidents,
                0
              ) / accidentTrendData.length
            )
          : 0
    },

    {
      label: 'Peak Month',

      value:
        accidentTrendData.length > 0
          ? [...accidentTrendData]
              .sort((a, b) => b.accidents - a.accidents)[0]
              ?.month
          : '-'
    },

    {
      label: 'Peak Hour',

      value:
        peakHourData.length > 0
          ? [...peakHourData]
              .sort((a, b) => b.accidents - a.accidents)[0]
              ?.hour
          : '-'
    },
  ];


  return (

    <div className="space-y-5">

      {/* Header */}
      <div>

        <h1 className="text-xl font-bold text-gray-900">
          Analytics
        </h1>

        <p className="text-sm text-gray-500 mt-0.5">
          Accident trends, peak hours, and severity distribution
        </p>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        {
          summaryCards.map((s) => (

            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm text-center"
            >

              <p className="text-xs text-gray-500 font-medium">
                {s.label}
              </p>

              <p className="text-lg font-bold text-gray-900 mt-0.5">
                {s.value}
              </p>

            </div>
          ))
        }

      </div>

      {/* Monthly Trend */}
      <ChartCard
        title="Monthly Accident Trend"
        subtitle="Monthly accident distribution"
      >

        <ResponsiveContainer width="100%" height={240}>

          <LineChart
            data={accidentTrendData}
            margin={{
              top: 5,
              right: 15,
              left: -10,
              bottom: 5
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 12,
                fill: '#6b7280'
              }}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: '#6b7280'
              }}
            />

            <Tooltip contentStyle={CustomTooltipStyle} />

            <Line
              type="monotone"
              dataKey="accidents"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{
                r: 3,
                fill: '#2563eb'
              }}
              activeDot={{
                r: 5
              }}
              name="Accidents"
            />

          </LineChart>

        </ResponsiveContainer>

      </ChartCard>

      {/* Peak Hours */}
      <ChartCard
        title="Accidents by Hour"
        subtitle="Peak traffic accident hours"
      >

        <ResponsiveContainer width="100%" height={240}>

          <BarChart
            data={peakHourData}
            margin={{
              top: 5,
              right: 10,
              left: -10,
              bottom: 5
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f0f0f0"
            />

            <XAxis
              dataKey="hour"
              tick={{
                fontSize: 11,
                fill: '#6b7280'
              }}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: '#6b7280'
              }}
            />

            <Tooltip contentStyle={CustomTooltipStyle} />

            <Bar
              dataKey="accidents"
              radius={[2, 2, 0, 0]}
            >

              {
                peakHourData.map((entry) => {

                  let color = '#22c55e';

                  if (entry.accidents >= 250) {
                    color = '#ef4444';
                  }

                  else if (entry.accidents >= 150) {
                    color = '#f97316';
                  }

                  else if (entry.accidents >= 100) {
                    color = '#eab308';
                  }

                  return (
                    <Cell
                      key={entry.hour}
                      fill={color}
                    />
                  );
                })
              }

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </ChartCard>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Pie Chart */}
        <ChartCard
          title="Severity Distribution"
          subtitle="Accident severity breakdown"
        >

          <div className="flex flex-col items-center">

            <ResponsiveContainer width="100%" height={220}>

              <PieChart>

                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >

                  {
                    severityData.map((entry) => (

                      <Cell
                        key={entry.name}
                        fill={entry.color}
                      />

                    ))
                  }

                </Pie>

                <Tooltip
                  contentStyle={CustomTooltipStyle}
                  formatter={(value: number) => [
                    `${value}%`,
                    'Share'
                  ]}
                />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

            <div className="w-full mt-2 space-y-2">

              {
                severityData.map((item) => (

                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >

                    <div className="flex items-center gap-2">

                      <span
                        className="w-3 h-3 rounded-sm inline-block"
                        style={{
                          background: item.color
                        }}
                      />

                      <span className="text-gray-700">
                        {item.name}
                      </span>

                    </div>

                    <span className="font-semibold text-gray-800">
                      {item.value}%
                    </span>

                  </div>
                ))
              }

            </div>

          </div>

        </ChartCard>

        {/* Key Observations */}
        <ChartCard
          title="Key Observations"
          subtitle="Traffic accident insights"
        >

          <div className="space-y-3 text-sm text-gray-700">

            {
              [
                {
                  label: 'Morning Rush',
                  note: 'High accident activity during office hours',
                  color: 'bg-red-500'
                },

                {
                  label: 'Evening Traffic',
                  note: 'Congestion increases accident probability',
                  color: 'bg-orange-400'
                },

                {
                  label: 'Monsoon Months',
                  note: 'Rain impacts road safety significantly',
                  color: 'bg-yellow-400'
                },

                {
                  label: 'Night Driving',
                  note: 'Lower visibility causes critical accidents',
                  color: 'bg-blue-400'
                },
              ].map((obs) => (

                <div
                  key={obs.label}
                  className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded border border-gray-100"
                >

                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${obs.color}`}
                  />

                  <div>

                    <p className="font-medium text-gray-800 text-xs uppercase tracking-wide">
                      {obs.label}
                    </p>

                    <p className="text-gray-600 text-xs mt-0.5">
                      {obs.note}
                    </p>

                  </div>

                </div>
              ))
            }

          </div>

        </ChartCard>

      </div>

    </div>
  );
}