import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, Menu, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const Header = ({ isLanding = false }: { isLanding?: boolean }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      const fetchCredits = async () => {
        const { data, error } = await supabase
          .from('user_credits')
          .select('credits_remaining')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          setCredits(data.credits_remaining);
        }
      };

      fetchCredits();
    }
  }, [user]);

  if (isLanding) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="m-4 p-4 rounded-lg glass-morphism backdrop-blur-md bg-white/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold text-white">HT Workout</h1>
                
                {/* Navigation Menu */}
                <nav className="hidden md:flex items-center space-x-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-white hover:bg-white/10">
                        Features <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-morphism border-white/20 bg-black/50 backdrop-blur-xl">
                      <DropdownMenuItem onClick={() => navigate('/calculators')} className="text-white hover:bg-white/10">
                        Calculators
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/meal-plans')} className="text-white hover:bg-white/10">
                        Meal Plans
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/workout-plans')} className="text-white hover:bg-white/10">
                        Workout Plans
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate('/pricing')}>
                    Pricing
                  </Button>
                  <Button variant="ghost" className="text-white hover:bg-white/10" onClick={() => navigate('/about')}>
                    About
                  </Button>
                </nav>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass-morphism border-white/20 bg-black/50 backdrop-blur-xl w-56">
                    <DropdownMenuItem onClick={() => navigate('/calculators')} className="text-white hover:bg-white/10">
                      Calculators
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/meal-plans')} className="text-white hover:bg-white/10">
                      Meal Plans
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/workout-plans')} className="text-white hover:bg-white/10">
                      Workout Plans
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={() => navigate('/pricing')} className="text-white hover:bg-white/10">
                      Pricing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/about')} className="text-white hover:bg-white/10">
                      About
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button 
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-primary via-accent to-[#9333EA] hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 right-0 z-50 p-4 flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-fit flex items-center gap-3 px-4 glass-morphism hover:bg-white/20">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image} />
              <AvatarFallback>
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{user?.name || 'User'}</span>
              <span className="text-xs text-gray-400">
                {credits !== null ? `${credits} credits remaining` : 'Loading credits...'}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 glass-morphism border-white/20 bg-black/50 backdrop-blur-xl">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem className="flex justify-between items-center hover:bg-white/10">
            <span>Credits Remaining</span>
            <Badge variant="secondary">{credits}</Badge>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-white/10">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={signOut} className="text-red-400 hover:bg-white/10">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;