import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Sparkles, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Constraint {
  id: string;
  label: string;
  description: string;
  value: number[];
  min: string;
  max: string;
}

const InsightInput = ({ onGenerate }: { onGenerate: (insight: string, constraints: any) => void }) => {
  const [insight, setInsight] = useState("");
  const [constraints, setConstraints] = useState<Constraint[]>([
    {
      id: "innovativeness",
      label: "Innovativeness",
      description: "How cutting-edge and novel should the ideas be?",
      value: [5],
      min: "Traditional",
      max: "Breakthrough"
    },
    {
      id: "practicality",
      label: "Practicality",
      description: "How feasible and realistic should the implementation be?",
      value: [7],
      min: "Experimental",
      max: "Proven"
    },
    {
      id: "budget",
      label: "Budget",
      description: "What's your investment capacity for this venture?",
      value: [5],
      min: "Bootstrap",
      max: "Well-funded"
    },
    {
      id: "complexity",
      label: "Complexity",
      description: "How sophisticated should the business model be?",
      value: [4],
      min: "Simple",
      max: "Enterprise"
    },
    {
      id: "timeToMarket",
      label: "Time to Market",
      description: "How quickly do you want to launch?",
      value: [6],
      min: "Long-term",
      max: "Immediate"
    }
  ]);

  const updateConstraint = (id: string, value: number[]) => {
    setConstraints(prev => 
      prev.map(constraint => 
        constraint.id === id ? { ...constraint, value } : constraint
      )
    );
  };

  const handleGenerate = () => {
    if (insight.trim()) {
      const constraintData = constraints.reduce((acc, constraint) => {
        acc[constraint.id] = constraint.value[0];
        return acc;
      }, {} as Record<string, number>);
      
      onGenerate(insight, constraintData);
    }
  };

  const exampleInsights = [
    "Remote work increases productivity by 23%",
    "People check their phones 96 times per day",
    "Meditation reduces stress hormones by 50%"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Insight Input */}
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Your Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="insight" className="text-sm font-medium">
                What's your key insight or observation?
              </Label>
              <Textarea
                id="insight"
                placeholder="Enter your insight, e.g., 'Mindfulness improves workplace productivity'"
                value={insight}
                onChange={(e) => setInsight(e.target.value)}
                className="mt-2 min-h-[120px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">
                  {insight.length}/500 characters
                </span>
                {insight.length === 0 && (
                  <Button 
                    variant="link" 
                    size="sm"
                    onClick={() => setInsight(exampleInsights[Math.floor(Math.random() * exampleInsights.length)])}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Try example
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Constraints */}
        <Card className="animate-fade-in-up animation-delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Customize Your Ideas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <TooltipProvider>
              {constraints.map((constraint) => (
                <div key={constraint.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium">
                        {constraint.label}
                      </Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{constraint.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {constraint.value[0]}/10
                    </span>
                  </div>
                  
                  <div className="px-3">
                    <Slider
                      value={constraint.value}
                      onValueChange={(value) => updateConstraint(constraint.id, value)}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{constraint.min}</span>
                      <span>{constraint.max}</span>
                    </div>
                  </div>
                </div>
              ))}
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>

      {/* Generate Button */}
      <div className="text-center mt-8">
        <Button
          variant="hero"
          size="xl"
          onClick={handleGenerate}
          disabled={!insight.trim()}
          className="animate-scale-in"
        >
          <Sparkles className="h-5 w-5" />
          Generate Business Ideas
        </Button>
      </div>
    </div>
  );
};

export default InsightInput;