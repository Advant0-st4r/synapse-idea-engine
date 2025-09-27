import { useState } from "react";
import Header from "@/components/layout/Header";
import WelcomeSection from "@/components/onboarding/WelcomeSection";
import InsightInput from "@/components/insights/InsightInput";
import IdeaPortfolio from "@/components/ideas/IdeaPortfolio";

type AppState = "welcome" | "input" | "portfolio" | "report";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [currentInsight, setCurrentInsight] = useState<string>("");
  const [currentConstraints, setCurrentConstraints] = useState<any>(null);

  const handleGetStarted = () => {
    setCurrentState("input");
  };

  const handleGenerateIdeas = (insight: string, constraints: any) => {
    setCurrentInsight(insight);
    setCurrentConstraints(constraints);
    setCurrentState("portfolio");
  };

  const handleViewDetails = (ideaId: string) => {
    console.log("View details for idea:", ideaId);
    // This would navigate to the detailed report view
    setCurrentState("report");
  };

  const renderCurrentView = () => {
    switch (currentState) {
      case "welcome":
        return (
          <div onClick={handleGetStarted} className="cursor-pointer">
            <WelcomeSection />
          </div>
        );
      case "input":
        return <InsightInput onGenerate={handleGenerateIdeas} />;
      case "portfolio":
        return <IdeaPortfolio onViewDetails={handleViewDetails} insight={currentInsight} />;
      case "report":
        return (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Industry Report</h1>
            <p className="text-muted-foreground mb-8">
              Detailed report view coming soon! This would show comprehensive market analysis, 
              competitive landscape, and actionable next steps.
            </p>
            <button 
              onClick={() => setCurrentState("portfolio")}
              className="text-primary hover:underline"
            >
              ← Back to Portfolio
            </button>
          </div>
        );
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {currentState !== "welcome" && <Header />}
      <main className={currentState === "welcome" ? "" : "pt-8"}>
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
