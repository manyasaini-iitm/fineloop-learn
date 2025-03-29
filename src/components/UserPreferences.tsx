
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, Sliders, Newspaper, BarChart2, ChevronRight, Clock, BookOpen } from "lucide-react";
import { toast } from "sonner";

// Mock user preferences data
const initialPreferences = {
  news: {
    categories: {
      economy: true,
      stocks: true,
      crypto: false,
      commodities: true,
      personalFinance: true
    },
    sources: {
      bloomberg: true,
      reuters: true,
      wsj: false,
      cnbc: true,
      ft: false
    },
    frequency: "daily"
  },
  watchlist: {
    defaultView: "cards",
    refreshRate: "realtime",
    notifications: true
  },
  habits: {
    reminderTime: "08:00",
    weeklyDigest: true,
    suggestionsEnabled: true
  }
};

const UserPreferences = () => {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isEditing, setIsEditing] = useState(false);

  const handleNewsToggle = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      news: {
        ...prev.news,
        categories: {
          ...prev.news.categories,
          [category]: !prev.news.categories[category as keyof typeof prev.news.categories]
        }
      }
    }));
  };

  const handleSourceToggle = (source: string) => {
    setPreferences(prev => ({
      ...prev,
      news: {
        ...prev.news,
        sources: {
          ...prev.news.sources,
          [source]: !prev.news.sources[source as keyof typeof prev.news.sources]
        }
      }
    }));
  };

  const handleWatchlistToggle = (setting: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      watchlist: {
        ...prev.watchlist,
        [setting]: value
      }
    }));
  };

  const handleHabitsToggle = (setting: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      habits: {
        ...prev.habits,
        [setting]: value
      }
    }));
  };

  const savePreferences = () => {
    // In a real app, this would save to a backend/API
    setIsEditing(false);
    toast.success("Your preferences have been saved successfully.");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold fin-gradient-text">User Preferences</h2>
        {isEditing ? (
          <Button onClick={savePreferences} className="flex items-center gap-1">
            <Save size={16} />
            Save Changes
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-1">
            <Settings size={16} />
            Edit Preferences
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">News Preferences</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">News Categories</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="economy" className="cursor-pointer">Economy</Label>
                    <Switch 
                      id="economy" 
                      checked={preferences.news.categories.economy} 
                      onCheckedChange={() => handleNewsToggle("economy")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stocks" className="cursor-pointer">Stocks</Label>
                    <Switch 
                      id="stocks" 
                      checked={preferences.news.categories.stocks} 
                      onCheckedChange={() => handleNewsToggle("stocks")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="crypto" className="cursor-pointer">Crypto</Label>
                    <Switch 
                      id="crypto" 
                      checked={preferences.news.categories.crypto} 
                      onCheckedChange={() => handleNewsToggle("crypto")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="commodities" className="cursor-pointer">Commodities</Label>
                    <Switch 
                      id="commodities" 
                      checked={preferences.news.categories.commodities} 
                      onCheckedChange={() => handleNewsToggle("commodities")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="personalFinance" className="cursor-pointer">Personal Finance</Label>
                    <Switch 
                      id="personalFinance" 
                      checked={preferences.news.categories.personalFinance} 
                      onCheckedChange={() => handleNewsToggle("personalFinance")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">News Sources</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="bloomberg" className="cursor-pointer">Bloomberg</Label>
                    <Switch 
                      id="bloomberg" 
                      checked={preferences.news.sources.bloomberg} 
                      onCheckedChange={() => handleSourceToggle("bloomberg")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reuters" className="cursor-pointer">Reuters</Label>
                    <Switch 
                      id="reuters" 
                      checked={preferences.news.sources.reuters} 
                      onCheckedChange={() => handleSourceToggle("reuters")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wsj" className="cursor-pointer">Wall Street Journal</Label>
                    <Switch 
                      id="wsj" 
                      checked={preferences.news.sources.wsj} 
                      onCheckedChange={() => handleSourceToggle("wsj")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cnbc" className="cursor-pointer">CNBC</Label>
                    <Switch 
                      id="cnbc" 
                      checked={preferences.news.sources.cnbc} 
                      onCheckedChange={() => handleSourceToggle("cnbc")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ft" className="cursor-pointer">Financial Times</Label>
                    <Switch 
                      id="ft" 
                      checked={preferences.news.sources.ft} 
                      onCheckedChange={() => handleSourceToggle("ft")}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Update Frequency</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={preferences.news.frequency === "realtime" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences(prev => ({
                      ...prev,
                      news: { ...prev.news, frequency: "realtime" }
                    }))}
                    disabled={!isEditing}
                  >
                    Real-time
                  </Button>
                  <Button 
                    variant={preferences.news.frequency === "daily" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences(prev => ({
                      ...prev,
                      news: { ...prev.news, frequency: "daily" }
                    }))}
                    disabled={!isEditing}
                  >
                    Daily
                  </Button>
                  <Button 
                    variant={preferences.news.frequency === "weekly" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreferences(prev => ({
                      ...prev,
                      news: { ...prev.news, frequency: "weekly" }
                    }))}
                    disabled={!isEditing}
                  >
                    Weekly
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BarChart2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Watchlist Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Default View</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant={preferences.watchlist.defaultView === "cards" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWatchlistToggle("defaultView", "cards")}
                      disabled={!isEditing}
                    >
                      Cards
                    </Button>
                    <Button 
                      variant={preferences.watchlist.defaultView === "table" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWatchlistToggle("defaultView", "table")}
                      disabled={!isEditing}
                    >
                      Table
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Data Refresh Rate</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={preferences.watchlist.refreshRate === "realtime" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWatchlistToggle("refreshRate", "realtime")}
                      disabled={!isEditing}
                    >
                      Real-time
                    </Button>
                    <Button 
                      variant={preferences.watchlist.refreshRate === "1min" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWatchlistToggle("refreshRate", "1min")}
                      disabled={!isEditing}
                    >
                      1 minute
                    </Button>
                    <Button 
                      variant={preferences.watchlist.refreshRate === "5min" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleWatchlistToggle("refreshRate", "5min")}
                      disabled={!isEditing}
                    >
                      5 minutes
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="watchlist-notifications" className="cursor-pointer">Price Alerts</Label>
                  <Switch 
                    id="watchlist-notifications" 
                    checked={preferences.watchlist.notifications} 
                    onCheckedChange={(checked) => handleWatchlistToggle("notifications", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Habit Tracking Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reminder-time" className="text-sm font-medium">Daily Reminder Time</Label>
                  <Input 
                    id="reminder-time" 
                    type="time" 
                    value={preferences.habits.reminderTime}
                    onChange={(e) => handleHabitsToggle("reminderTime", e.target.value)}
                    className="mt-2"
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekly-digest" className="cursor-pointer">Weekly Progress Digest</Label>
                  <Switch 
                    id="weekly-digest" 
                    checked={preferences.habits.weeklyDigest} 
                    onCheckedChange={(checked) => handleHabitsToggle("weeklyDigest", checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="suggestions" className="cursor-pointer">Mindful Suggestions</Label>
                  <Switch 
                    id="suggestions" 
                    checked={preferences.habits.suggestionsEnabled} 
                    onCheckedChange={(checked) => handleHabitsToggle("suggestionsEnabled", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
