import {
  Shield,
  Activity,
  Map,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

type LandingPageProps = {
  onGetStarted: () => void;
};

export default function LandingPage({
  onGetStarted,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900 overflow-hidden">
      {/* NAVBAR */}
      <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>

            <div>
              <h1 className="text-xl font-bold">RoadSafe</h1>
              <p className="text-xs text-gray-500">
                Accident Hotspot Predictor
              </p>
            </div>
          </div>


          {/* Button */}
          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2 rounded-xl text-sm font-medium shadow-lg"
          >
            Open Dashboard
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14 items-center">
        {/* LEFT CONTENT */}
        <div>
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-semibold mb-5">
            <Activity className="w-4 h-4" />
            AI-Powered Accident Risk Analysis
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Safer Roads With
            <span className="text-blue-600"> Intelligent </span>
            Accident Prediction
          </h1>

          <p className="text-base text-gray-600 leading-relaxed mb-8 max-w-xl">
            Predict accident-prone zones across India using AI-driven
            analytics, live prediction systems, heatmaps, and real-time
            traffic risk insights.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={onGetStarted}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-xl"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGetStarted}
              className="border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all px-6 py-3 rounded-2xl text-sm font-semibold bg-white"
            >
              Live Prediction
            </button>
          </div>

          {/* FEATURES */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "AI Risk Prediction",
              "Interactive Heatmaps",
              "Real-Time Analytics",
              "District-Level Insights",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white border rounded-2xl p-4 shadow-sm"
              >
                <CheckCircle2 className="text-green-500 w-4 h-4" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT DASHBOARD PREVIEW */}
        <div className="relative">
          {/* Glow */}
          <div className="absolute inset-0 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

          <div className="relative bg-white border rounded-3xl shadow-2xl overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
              <div>
                <h2 className="font-bold text-lg">
                  RoadSafe Dashboard
                </h2>

                <p className="text-xs text-gray-500">
                  India Accident Analytics
                </p>
              </div>

              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                Live
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="bg-red-50 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-500 text-sm font-medium">
                    Total Accidents
                  </p>

                  <Activity className="text-red-500 w-4 h-4" />
                </div>

                <h3 className="text-2xl font-bold">12,847</h3>
              </div>

              <div className="bg-orange-50 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-500 text-sm font-medium">
                    High Risk Zones
                  </p>

                  <Map className="text-orange-500 w-4 h-4" />
                </div>

                <h3 className="text-2xl font-bold">38</h3>
              </div>

              <div className="bg-yellow-50 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-500 text-sm font-medium">
                    Avg Risk Score
                  </p>

                  <BarChart3 className="text-yellow-600 w-4 h-4" />
                </div>

                <h3 className="text-2xl font-bold">61.4%</h3>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-500 text-sm font-medium">
                    Most Dangerous
                  </p>

                  <Shield className="text-blue-600 w-4 h-4" />
                </div>

                <h3 className="text-xl font-bold">Delhi NCR</h3>
              </div>
            </div>

            {/* Bottom List */}
            <div className="px-6 pb-6">
              <div className="bg-slate-50 border rounded-2xl p-5">
                <h3 className="text-base font-bold mb-5">
                  High Risk Cities
                </h3>

                {[
                  { city: "Delhi", risk: "92%" },
                  { city: "Mumbai", risk: "87%" },
                  { city: "Kolkata", risk: "79%" },
                ].map((item, index) => (
                  <div key={index} className="mb-5">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        {item.city}
                      </span>

                      <span className="text-sm font-bold">
                        {item.risk}
                      </span>
                    </div>

                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                        style={{ width: item.risk }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-4">
            Smart Features For Safer Roads
          </h2>

          <p className="text-gray-600 text-base">
            Advanced AI tools designed to detect and analyze accident
            hotspots.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Live Prediction",
              desc: "Predict accident probability instantly using real-time inputs and AI models.",
              icon: Activity,
            },
            {
              title: "Heatmap Visualization",
              desc: "Explore accident density using interactive geographic heatmaps.",
              icon: Map,
            },
            {
              title: "Advanced Analytics",
              desc: "Get detailed insights into high-risk zones and accident trends.",
              icon: BarChart3,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="bg-blue-100 w-fit p-4 rounded-2xl mb-6">
                <item.icon className="text-blue-600 w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold mb-4">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] text-white p-12 text-center shadow-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-5">
            Start Exploring Road Safety Intelligence
          </h2>

          <p className="text-base text-blue-100 mb-8 max-w-2xl mx-auto">
            Analyze accident patterns, predict hotspots, and improve
            traffic safety with AI-powered insights.
          </p>

          <button
            onClick={onGetStarted}
            className="bg-white text-blue-600 hover:bg-gray-100 transition-all px-8 py-3 rounded-2xl text-sm font-bold shadow-lg"
          >
            Launch Dashboard
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t bg-white py-8 text-center text-gray-500"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          RoadSafe
        </h3>

        <p className="text-sm">
          AI Powered Accident Hotspot Prediction System
        </p>

        <p className="mt-3 text-xs">
          © 2026 All Rights Reserved
        </p>
      </footer>
    </div>
  );
}