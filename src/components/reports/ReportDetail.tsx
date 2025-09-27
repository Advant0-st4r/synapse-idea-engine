import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, Download, Share, TrendingUp, Target, DollarSign, 
  Users, Globe, AlertTriangle, CheckCircle, Clock, BarChart3,
  Lightbulb, Calendar, MapPin
} from "lucide-react";

interface ReportDetailProps {
  ideaId: string;
  onBack: () => void;
}

const ReportDetail = ({ ideaId, onBack }: ReportDetailProps) => {
  // Mock data - in real app this would come from API based on ideaId
  const reportData = {
    id: ideaId,
    title: "Corporate Mindfulness Platform",
    summary: "AI-powered mindfulness app specifically designed for corporate environments with team challenges, productivity tracking, and ROI measurement for HR departments.",
    category: "SaaS/Wellness",
    generatedAt: "March 15, 2024",
    
    scores: {
      demand: 85,
      feasibility: 78,
      roi: 92
    },
    
    marketAnalysis: {
      size: "$2.4B",
      growth: "15.2%",
      segments: [
        { name: "Corporate Wellness", size: "45%", growth: "18%" },
        { name: "Mental Health Apps", size: "35%", growth: "22%" },
        { name: "Employee Engagement", size: "20%", growth: "12%" }
      ]
    },
    
    competitors: [
      { name: "Headspace for Business", marketShare: "28%", strength: "Brand Recognition" },
      { name: "Calm for Business", marketShare: "22%", strength: "Content Quality" },
      { name: "Ten Percent Happier", marketShare: "15%", strength: "Corporate Focus" },
      { name: "Insight Timer", marketShare: "8%", strength: "Community Features" }
    ],
    
    opportunities: [
      "Growing awareness of mental health in workplace",
      "Remote work increasing stress and burnout",
      "HR departments seeking measurable wellness solutions",
      "Corporate ESG initiatives prioritizing employee wellbeing"
    ],
    
    risks: [
      "Market saturation with existing mindfulness apps",
      "Privacy concerns with employee health data",
      "Resistance to adoption from traditional industries",
      "Economic downturns reducing corporate wellness budgets"
    ],
    
    implementation: {
      timeline: "8-12 months",
      budget: "$150K - $300K",
      team: "4-6 people",
      phases: [
        { phase: "Research & Design", duration: "2 months", tasks: ["Market research", "UX design", "Technical architecture"] },
        { phase: "MVP Development", duration: "4 months", tasks: ["Core app features", "Admin dashboard", "Basic analytics"] },
        { phase: "Pilot Program", duration: "2 months", tasks: ["Beta testing", "Corporate partnerships", "Feedback integration"] },
        { phase: "Launch & Scale", duration: "4+ months", tasks: ["Marketing campaign", "Sales team", "Feature expansion"] }
      ]
    },
    
    financials: {
      revenueModel: "B2B SaaS subscription",
      pricing: "$8-15 per employee/month",
      breakeven: "18 months",
      projectedRevenue: [
        { year: "Year 1", revenue: "$120K", customers: 5 },
        { year: "Year 2", revenue: "$480K", customers: 15 },
        { year: "Year 3", revenue: "$1.2M", customers: 35 }
      ]
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{reportData.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="secondary">{reportData.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Generated {reportData.generatedAt}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4" />
            Share Report
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="bg-gradient-surface border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {reportData.summary}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-card/50">
              <div className="text-2xl font-bold text-chart-demand mb-1">{reportData.scores.demand}%</div>
              <div className="text-sm text-muted-foreground">Market Demand</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50">
              <div className="text-2xl font-bold text-chart-feasibility mb-1">{reportData.scores.feasibility}%</div>
              <div className="text-sm text-muted-foreground">Feasibility</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50">
              <div className="text-2xl font-bold text-chart-roi mb-1">{reportData.scores.roi}%</div>
              <div className="text-sm text-muted-foreground">ROI Potential</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="market" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="competition">Competition</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="market">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">{reportData.marketAnalysis.size}</div>
                    <div className="text-muted-foreground mb-4">Total Addressable Market</div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="font-semibold">{reportData.marketAnalysis.growth} CAGR</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Expected annual growth rate</div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Market Segments</h4>
                    {reportData.marketAnalysis.segments.map((segment, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{segment.name}</span>
                          <span className="font-medium">{segment.size}</span>
                        </div>
                        <Progress value={parseInt(segment.size)} className="h-2" />
                        <div className="text-xs text-muted-foreground">Growth: {segment.growth}/year</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Market Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportData.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Market Risks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportData.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20">
                      <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{risk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competition">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Competitive Landscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold">
                        {competitor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{competitor.name}</div>
                        <div className="text-sm text-muted-foreground">Market Share: {competitor.marketShare}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{competitor.strength}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Go-to-Market Strategy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-2">Target Market</h4>
                    <p className="text-sm text-muted-foreground">Mid to large corporations (500+ employees) with existing wellness initiatives</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                    <h4 className="font-semibold mb-2">Value Proposition</h4>
                    <p className="text-sm text-muted-foreground">Measurable ROI on employee wellness with enterprise-grade security and compliance</p>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <h4 className="font-semibold mb-2">Distribution</h4>
                    <p className="text-sm text-muted-foreground">Direct B2B sales, HR conferences, and strategic partnerships with consulting firms</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Positioning & Differentiation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">Enterprise-First Design</h4>
                      <p className="text-sm text-muted-foreground">Built specifically for corporate environments with admin controls, compliance features, and integration capabilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">ROI Measurement</h4>
                      <p className="text-sm text-muted-foreground">Advanced analytics linking mindfulness practice to productivity metrics, absenteeism, and employee satisfaction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div>
                      <h4 className="font-semibold">AI-Powered Personalization</h4>
                      <p className="text-sm text-muted-foreground">Machine learning algorithms that adapt content and recommendations based on individual and team stress patterns</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="implementation">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Implementation Timeline
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Estimated {reportData.implementation.timeline} • Budget: {reportData.implementation.budget} • Team: {reportData.implementation.team}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reportData.implementation.phases.map((phase, index) => (
                    <div key={index} className="relative">
                      {index < reportData.implementation.phases.length - 1 && (
                        <div className="absolute left-4 top-8 w-0.5 h-16 bg-border"></div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{phase.phase}</h4>
                            <Badge variant="outline">{phase.duration}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {phase.tasks.map((task, taskIndex) => (
                              <Badge key={taskIndex} variant="secondary" className="text-xs">
                                {task}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financials">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-card/50">
                    <div className="text-lg font-semibold">{reportData.financials.revenueModel}</div>
                    <div className="text-sm text-muted-foreground">Business Model</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card/50">
                    <div className="text-lg font-semibold">{reportData.financials.pricing}</div>
                    <div className="text-sm text-muted-foreground">Pricing Range</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card/50">
                    <div className="text-lg font-semibold">{reportData.financials.breakeven}</div>
                    <div className="text-sm text-muted-foreground">Break-even Point</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.financials.projectedRevenue.map((projection, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="font-semibold">{projection.year}</div>
                        <div className="text-sm text-muted-foreground">{projection.customers} customers</div>
                      </div>
                      <div className="text-lg font-bold text-primary">{projection.revenue}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportDetail;