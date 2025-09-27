import { useState } from "react";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import Header from "@/components/layout/Header";
import WelcomeSection from "@/components/onboarding/WelcomeSection";
import InsightInput from "@/components/insights/InsightInput";
import IdeaPortfolio from "@/components/ideas/IdeaPortfolio";
import ReportDetail from "@/components/reports/ReportDetail";
import Settings from "@/components/settings/Settings";
import Profile from "@/components/profile/Profile";
import { generateIdeas, type GeneratedIdea } from "@/services/ideaGeneration";
import { useApiKeys } from "@/contexts/ApiKeyContext";
import { useToast } from "@/hooks/use-toast";

type AppState = "welcome" | "input" | "portfolio" | "report" | "settings" | "profile";

const IndexContent = () => {
  const [currentState, setCurrentState] = useState<AppState>("welcome");
  const [currentInsight, setCurrentInsight] = useState<string>("");
  const [currentConstraints, setCurrentConstraints] = useState<any>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { openaiApiKey, anthropicApiKey, preferredModel, hasValidApiKey } = useApiKeys();
  const { toast } = useToast();

  const handleGetStarted = () => {
    setCurrentState("input");
  };

  const handleGenerateIdeas = async (insight: string, constraints: any) => {
    if (!hasValidApiKey()) {
      toast({
        title: "API Key Required",
        description: "Please configure your API keys in Settings before generating ideas.",
        variant: "destructive",
      });
      setCurrentState("settings");
      return;
    }

    setIsGenerating(true);
    setCurrentInsight(insight);
    setCurrentConstraints(constraints);
    
    try {
      const apiKey = preferredModel.startsWith('claude-') ? anthropicApiKey : openaiApiKey;
      const ideas = await generateIdeas({ insight, constraints }, apiKey, preferredModel);
      setGeneratedIdeas(ideas);
      setCurrentState("portfolio");
      
      toast({
        title: "Ideas Generated!",
        description: `Generated ${ideas.length} business ideas based on your insight.`,
      });
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleViewDetails = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
    setCurrentState("report");
  };

  const handleNavigate = (state: AppState) => {
    setCurrentState(state);
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
        return <InsightInput onGenerate={handleGenerateIdeas} isGenerating={isGenerating} />;
      case "portfolio":
        return <IdeaPortfolio onViewDetails={handleViewDetails} insight={currentInsight} ideas={generatedIdeas} />;
      case "report":
        return <ReportDetail ideaId={selectedIdeaId} onBack={() => setCurrentState("portfolio")} />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      default:
        return <WelcomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {currentState !== "welcome" && <Header onNavigate={handleNavigate} />}
      <main className={currentState === "welcome" ? "" : "pt-8"}>
        {renderCurrentView()}
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <ApiKeyProvider>
      <IndexContent />
    </ApiKeyProvider>
  );
};

export default Index;
