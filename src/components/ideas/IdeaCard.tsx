import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, DollarSign, ArrowRight, Bookmark } from "lucide-react";

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    summary: string;
    demand: number;
    feasibility: number;
    roi: number;
    category: string;
    marketSize?: string;
    timeline?: string;
  };
  onViewDetails: (id: string) => void;
  onSave?: (id: string) => void;
}

const IdeaCard = ({ idea, onViewDetails, onSave }: IdeaCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-success/10";
    if (score >= 60) return "bg-warning/10";
    return "bg-destructive/10";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
              {idea.title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {idea.category}
            </Badge>
          </div>
          {onSave && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onSave(idea.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {idea.summary}
        </p>

        {/* Scores */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-chart-demand" />
              <span className="text-sm font-medium">Market Demand</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${getScoreColor(idea.demand)}`}>
                {idea.demand}%
              </span>
            </div>
          </div>
          <Progress 
            value={idea.demand} 
            className="h-2"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-chart-feasibility" />
              <span className="text-sm font-medium">Feasibility</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${getScoreColor(idea.feasibility)}`}>
                {idea.feasibility}%
              </span>
            </div>
          </div>
          <Progress 
            value={idea.feasibility} 
            className="h-2"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-chart-roi" />
              <span className="text-sm font-medium">ROI Potential</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${getScoreColor(idea.roi)}`}>
                {idea.roi}%
              </span>
            </div>
          </div>
          <Progress 
            value={idea.roi} 
            className="h-2"
          />
        </div>

        {/* Additional Info */}
        {(idea.marketSize || idea.timeline) && (
          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
            {idea.marketSize && (
              <span>Market: {idea.marketSize}</span>
            )}
            {idea.timeline && (
              <span>Timeline: {idea.timeline}</span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          onClick={() => onViewDetails(idea.id)}
        >
          View Detailed Report
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IdeaCard;