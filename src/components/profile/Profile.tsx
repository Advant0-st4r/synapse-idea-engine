import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  User, Bookmark, Clock, TrendingUp, Search, Filter,
  Calendar, Download, BarChart3, Eye, Edit, Trash2
} from "lucide-react";

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    company: "TechCorp Inc.",
    role: "Product Manager",
    memberSince: "January 2024",
    totalIdeas: 47,
    savedReports: 12,
    averageScore: 78
  };

  // Mock saved ideas
  const savedIdeas = [
    {
      id: "1",
      title: "Corporate Mindfulness Platform",
      category: "SaaS/Wellness",
      createdAt: "March 15, 2024",
      demand: 85,
      feasibility: 78,
      roi: 92,
      status: "analyzed"
    },
    {
      id: "2",
      title: "Workplace Stress Analytics",
      category: "Analytics/HR",
      createdAt: "March 10, 2024",
      demand: 72,
      feasibility: 85,
      roi: 78,
      status: "draft"
    },
    {
      id: "3",
      title: "Remote Team Collaboration Tool",
      category: "Productivity",
      createdAt: "March 8, 2024",
      demand: 90,
      feasibility: 70,
      roi: 85,
      status: "analyzed"
    },
    {
      id: "4",
      title: "AI-Powered Learning Platform",
      category: "EdTech",
      createdAt: "March 5, 2024",
      demand: 78,
      feasibility: 65,
      roi: 88,
      status: "implementing"
    }
  ];

  // Mock activity data
  const recentActivity = [
    {
      id: "1",
      action: "Generated new idea",
      title: "Corporate Mindfulness Platform",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      action: "Downloaded report",
      title: "Workplace Stress Analytics",
      timestamp: "1 day ago"
    },
    {
      id: "3",
      action: "Shared portfolio",
      title: "Q1 2024 Ideas Collection",
      timestamp: "3 days ago"
    },
    {
      id: "4",
      action: "Updated settings",
      title: "AI model preferences",
      timestamp: "1 week ago"
    }
  ];

  const filteredIdeas = savedIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || idea.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "analyzed": return "bg-success text-success-foreground";
      case "draft": return "bg-secondary text-secondary-foreground";
      case "implementing": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-surface border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center text-white text-xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">{userData.role} at {userData.company}</p>
                <p className="text-sm text-muted-foreground mt-1">Member since {userData.memberSince}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 md:ml-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userData.totalIdeas}</div>
                <div className="text-sm text-muted-foreground">Ideas Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-feasibility">{userData.savedReports}</div>
                <div className="text-sm text-muted-foreground">Reports Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chart-roi">{userData.averageScore}%</div>
                <div className="text-sm text-muted-foreground">Avg Score</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="ideas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ideas">My Ideas</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas">
          <div className="space-y-4">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search your ideas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant={selectedFilter === "all" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("all")}
                    >
                      All
                    </Button>
                    <Button 
                      variant={selectedFilter === "analyzed" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("analyzed")}
                    >
                      Analyzed
                    </Button>
                    <Button 
                      variant={selectedFilter === "draft" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("draft")}
                    >
                      Draft
                    </Button>
                    <Button 
                      variant={selectedFilter === "implementing" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedFilter("implementing")}
                    >
                      In Progress
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ideas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold leading-tight mb-2">
                          {idea.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {idea.category}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(idea.status)}`}>
                            {idea.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Created {idea.createdAt}
                        </p>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-chart-demand">{idea.demand}%</div>
                        <div className="text-xs text-muted-foreground">Demand</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-chart-feasibility">{idea.feasibility}%</div>
                        <div className="text-xs text-muted-foreground">Feasibility</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-chart-roi">{idea.roi}%</div>
                        <div className="text-xs text-muted-foreground">ROI</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIdeas.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No ideas found matching your criteria.</p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("");
                    setSelectedFilter("all");
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{activity.action}</span>
                            <span className="text-muted-foreground"> - {activity.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Your Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-card/50">
                    <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground">Ideas This Month</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card/50">
                    <Bookmark className="h-8 w-8 text-chart-demand mx-auto mb-2" />
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Reports Downloaded</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card/50">
                    <Calendar className="h-8 w-8 text-chart-feasibility mx-auto mb-2" />
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Days Active</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-card/50">
                    <Download className="h-8 w-8 text-chart-roi mx-auto mb-2" />
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Ideas Implemented</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SaaS/Technology</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-primary"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Healthcare</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-chart-demand"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">50%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Finance</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-chart-feasibility"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">33%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Education</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-1/4 h-full bg-chart-roi"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;