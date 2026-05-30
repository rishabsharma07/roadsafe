import { useState } from "react";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import LivePrediction from "./pages/LivePrediction";
import Heatmap from "./pages/Heatmap";
import Analytics from "./pages/Analytics";
import Explainability from "./pages/Explainability";
import LandingPage from "./pages/LandingPage";

type Page =
  | "landing"
  | "dashboard"
  | "prediction"
  | "heatmap"
  | "analytics"
  | "explainability";

export default function App() {

  const [page, setPage] = useState<Page>("landing");


  const renderPage = () => {

    switch (page) {

      case "landing":

        return (
          <LandingPage
            onGetStarted={() => setPage("dashboard")}
          />
        );


      case "dashboard":

        return <Dashboard />;


      case "prediction":

        return <LivePrediction />;


      case "heatmap":

        return <Heatmap />;


      case "analytics":

        return <Analytics />;


      case "explainability":

        return <Explainability />;


      default:

        return <Dashboard />;
    }
  };


  // Landing page without layout
  if (page === "landing") {

    return renderPage();
  }


  // Other pages with layout
  return (

    <Layout
      currentPage={page}
      onNavigate={(p) => setPage(p as Page)}
    >

      {renderPage()}

    </Layout>
  );
}