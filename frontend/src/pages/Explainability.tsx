import { useState } from 'react';

export default function Explainability() {

  const [mockFactors] = useState([
    {
      feature: 'Weather Conditions',
      importance: 0.24
    },
    {
      feature: 'Road Surface',
      importance: 0.18
    },
    {
      feature: 'Hour',
      importance: 0.14
    },
    {
      feature: 'Light Conditions',
      importance: 0.11
    },
    {
      feature: 'Urban Area',
      importance: 0.08
    }
  ]);

  return (

    <div className="space-y-5">

      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          AI Explainability
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Understand which factors most influenced accident risk prediction
        </p>

      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Top Risk Factors
        </h2>

        <div className="space-y-4">

          {
            mockFactors.map((factor) => (

              <div key={factor.feature}>

                <div className="flex justify-between mb-1">

                  <span className="text-sm font-medium text-gray-700">
                    {factor.feature}
                  </span>

                  <span className="text-sm text-gray-500">
                    {(factor.importance * 100).toFixed(1)}%
                  </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{
                      width: `${factor.importance * 100}%`
                    }}
                  />

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}