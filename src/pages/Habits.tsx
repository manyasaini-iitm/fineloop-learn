
import Navbar from "@/components/Navbar";
import HabitTracker from "@/components/HabitTracker";
import UserPreferences from "@/components/UserPreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Habits = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Financial Habit Tracker</h1>
        
        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px] mb-6">
            <TabsTrigger value="tracker">Habits</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracker" className="mt-0">
            <HabitTracker />
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-0">
            <UserPreferences />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Habits;
