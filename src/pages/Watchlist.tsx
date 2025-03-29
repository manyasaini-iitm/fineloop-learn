
import Navbar from "@/components/Navbar";
import WatchlistDashboard from "@/components/WatchlistDashboard";
import UserPreferences from "@/components/UserPreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Watchlist = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Asset Watchlist</h1>
        
        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px] mb-6">
            <TabsTrigger value="watchlist">Dashboard</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="watchlist" className="mt-0">
            <WatchlistDashboard />
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-0">
            <UserPreferences />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Watchlist;
