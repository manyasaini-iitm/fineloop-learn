
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsFeed from "@/components/NewsFeed";
import WatchlistDashboard from "@/components/WatchlistDashboard";
import HabitTracker from "@/components/HabitTracker";
import Navbar from "@/components/Navbar";
import { 
  ArrowRight, ChevronRight, Lightbulb, BarChart2, BookOpen, Clock, 
  TrendingUp, CreditCard, Wallet, PiggyBank, BookOpenCheck
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to FineLoop</h1>
          <p className="text-muted-foreground text-lg">Your path to financial literacy and mindful investing</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-finloop-blue/10 to-finloop-teal/10 border-finloop-teal/20 fin-hover-effect">
            <BookOpen className="h-8 w-8 text-finloop-blue mb-3" />
            <h3 className="text-lg font-semibold mb-1">Personalized News</h3>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with news tailored to your financial interests and get explanations for complex concepts.</p>
            <Button variant="outline" size="sm" className="mt-auto flex items-center gap-1" asChild>
              <a href="/news">
                Explore News
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-finloop-teal/10 to-finloop-green/10 border-finloop-green/20 fin-hover-effect">
            <BarChart2 className="h-8 w-8 text-finloop-teal mb-3" />
            <h3 className="text-lg font-semibold mb-1">Market Watchlist</h3>
            <p className="text-sm text-muted-foreground mb-4">Track and analyze stocks, crypto, and other assets with real-time insights and alerts.</p>
            <Button variant="outline" size="sm" className="mt-auto flex items-center gap-1" asChild>
              <a href="/watchlist">
                View Watchlist
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-finloop-green/10 to-finloop-blue/10 border-finloop-blue/20 fin-hover-effect">
            <Clock className="h-8 w-8 text-finloop-green mb-3" />
            <h3 className="text-lg font-semibold mb-1">Habit Tracking</h3>
            <p className="text-sm text-muted-foreground mb-4">Build better financial habits with mindful suggestions based on your behavior patterns.</p>
            <Button variant="outline" size="sm" className="mt-auto flex items-center gap-1" asChild>
              <a href="/habits">
                Track Habits
                <ChevronRight className="h-4 w-4" />
              </a>
            </Button>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
            <TabsTrigger value="habits">Habits</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <NewsFeed />
          </TabsContent>
          
          <TabsContent value="watchlist" className="mt-0">
            <WatchlistDashboard />
          </TabsContent>
          
          <TabsContent value="habits" className="mt-0">
            <HabitTracker />
          </TabsContent>
        </Tabs>
        
        <div className="bg-gradient-to-r from-finloop-blue to-finloop-teal rounded-xl p-8 shadow-lg text-white">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-3">Start Your Financial Learning Journey Today</h2>
              <p className="mb-4">FineLoop helps you build financial literacy with personalized content, tracking tools, and mindful habit development.</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" className="flex items-center gap-1">
                  <BookOpenCheck className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/20 flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" />
                  Get Recommendations
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Investing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                <Wallet className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Budgeting</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                <CreditCard className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Credit</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg text-center">
                <PiggyBank className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm font-medium">Saving</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
