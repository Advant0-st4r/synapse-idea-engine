import { Button } from "@/components/ui/button";
import { Lightbulb, User, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero shadow-glow">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                Synapse
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Idea Engine
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Portfolio
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Reports
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="hero" size="sm">
              Generate Ideas
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;