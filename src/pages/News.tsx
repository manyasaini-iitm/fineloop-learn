
import Navbar from "@/components/Navbar";
import NewsFeed from "@/components/NewsFeed";
import UserPreferences from "@/components/UserPreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const News = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Financial News & Analysis</h1>
        
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px] mb-6">
            <TabsTrigger value="news">News Feed</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="news" className="mt-0">
            <NewsFeed />
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-0">
            <UserPreferences />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default News;
