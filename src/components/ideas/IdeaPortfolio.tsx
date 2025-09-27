import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IdeaCard from "./IdeaCard";
import { Search, Filter, Download, Share, TrendingUp } from "lucide-react";

// Mock data - in real app this would come from props or API
const mockIdeas = [
  {
    id: "1",
    title: "Corporate Mindfulness Platform",
    summary: "AI-powered mindfulness app specifically designed for corporate environments with team challenges, productivity tracking, and ROI measurement for HR departments.",
    demand: 85,
    feasibility: 78,
    roi: 92,
    category: "SaaS/Wellness",
    marketSize: "$2.4B",
    timeline: "8-12 months"
  },
  {
    id: "2", 
    title: "Workplace Stress Analytics",
    summary: "Data analytics platform that measures workplace stress indicators through calendar analysis, email patterns, and optional biometric integration to help companies optimize work environments.",
    demand: 72,
    feasibility: 85,
    roi: 78,
    category: "Analytics/HR",
    marketSize: "$890M",
    timeline: "12-18 months"
  },
  {
    id: "3",
    title: "Mindful Meeting Assistant",
    summary: "Browser extension and mobile app that provides pre-meeting breathing exercises, real-time stress monitoring, and post-meeting reflection prompts to improve meeting effectiveness.",
    demand: 68,
    feasibility: 92,
    roi: 65,
    category: "Productivity",
    marketSize: "$450M", 
    timeline: "4-6 months"
  },
  {
    id: "4",
    title: "Executive Wellness Coaching",
    summary: "Premium 1-on-1 mindfulness coaching service for C-level executives, combining ancient meditation practices with modern neuroscience and performance optimization.",
    demand: 78,
    feasibility: 70,
    roi: 88,
    category: "Service/Coaching",
    marketSize: "$320M",
    timeline: "2-3 months"
  }
];

interface IdeaPortfolioProps {
  onViewDetails: (id: string) => void;
  insight?: string;
}

const IdeaPortfolio = ({ onViewDetails, insight }: IdeaPortfolioProps) => {
  const [sortBy, setSortBy] = useState<string>("overall");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Array.from(new Set(mockIdeas.map(idea => idea.category)));

  const filteredAndSortedIdeas = mockIdeas
    .filter(idea => {
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           idea.summary.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || idea.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "demand":
          return b.demand - a.demand;
        case "feasibility":
          return b.feasibility - a.feasibility;
        case "roi":
          return b.roi - a.roi;
        case "overall":
        default:
          return (b.demand + b.feasibility + b.roi) - (a.demand + a.feasibility + a.roi);
      }
    });

  const avgDemand = Math.round(mockIdeas.reduce((sum, idea) => sum + idea.demand, 0) / mockIdeas.length);
  const avgFeasibility = Math.round(mockIdeas.reduce((sum, idea) => sum + idea.feasibility, 0) / mockIdeas.length);
  const avgROI = Math.round(mockIdeas.reduce((sum, idea) => sum + idea.roi, 0) / mockIdeas.length);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Business Ideas Portfolio</h1>
            {insight && (
              <p className="text-muted-foreground">
                Generated from: <span className="italic">"{insight}"</span>
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4" />
              Share Portfolio
            </Button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <Card className="mb-6 bg-gradient-surface border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Portfolio Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{mockIdeas.length}</div>
                <div className="text-sm text-muted-foreground">Total Ideas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-demand">{avgDemand}%</div>
                <div className="text-sm text-muted-foreground">Avg Demand</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-feasibility">{avgFeasibility}%</div>
                <div className="text-sm text-muted-foreground">Avg Feasibility</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-roi">{avgROI}%</div>
                <div className="text-sm text-muted-foreground">Avg ROI</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="animate-fade-in-up animation-delay-200">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search ideas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overall">Overall Score</SelectItem>
                  <SelectItem value="demand">Market Demand</SelectItem>
                  <SelectItem value="feasibility">Feasibility</SelectItem>
                  <SelectItem value="roi">ROI Potential</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ideas Grid */}
      <div className="animate-fade-in-up animation-delay-300">
        {filteredAndSortedIdeas.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAndSortedIdeas.map((idea, index) => (
              <div
                key={idea.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <IdeaCard
                  idea={idea}
                  onViewDetails={onViewDetails}
                  onSave={(id) => console.log("Save idea:", id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No ideas found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IdeaPortfolio;