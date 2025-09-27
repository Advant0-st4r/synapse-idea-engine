import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, TrendingUp, Target } from "lucide-react";

const WelcomeSection = () => {
  return (
    <section className="min-h-screen bg-gradient-surface relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <div className="animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Turn Your{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Insights
              </span>{" "}
              into{" "}
              <span className="bg-gradient-success bg-clip-text text-transparent">
                Business Success
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform any insight into a ranked portfolio of actionable business ideas. 
              Get industry reports, market analysis, and ROI projections in seconds.
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-200 mb-16">
            <Button variant="hero" size="xl" className="animate-glow">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              No credit card required • Generate 5 ideas free
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <div className="animate-fade-in-up animation-delay-300">
              <FeatureCard
                icon={<Lightbulb className="h-8 w-8 text-primary" />}
                title="AI-Powered Generation"
                description="Transform any insight into ranked business opportunities using advanced AI analysis."
              />
            </div>
            <div className="animate-fade-in-up animation-delay-400">
              <FeatureCard
                icon={<TrendingUp className="h-8 w-8 text-success" />}
                title="Market Intelligence"
                description="Get real-time market data, growth rates, and competitive analysis for every idea."
              />
            </div>
            <div className="animate-fade-in-up animation-delay-500">
              <FeatureCard
                icon={<Target className="h-8 w-8 text-warning" />}
                title="Custom Constraints"
                description="Tailor ideas to your budget, timeline, and risk tolerance with smart filtering."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border/50">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 rounded-lg bg-gradient-surface">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default WelcomeSection;