
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer
} from "recharts";
import { 
  CheckCircle2, XCircle, AlertTriangle, TrendingUp, ArrowRight, Calendar, 
  Lightbulb, Brain, Clock, Award, BarChart2, Compass 
} from "lucide-react";

// Mock data for financial habits
const mockHabits = [
  {
    id: 1,
    name: "Review spending",
    category: "tracking",
    frequency: "weekly",
    streak: 3,
    completion: 0.8, // 80% completion
    status: "active",
    lastCompleted: "Today",
    insights: "You tend to review expenses consistently on weekends.",
    suggestion: "Try categorizing expenses for better insight into spending patterns."
  },
  {
    id: 2,
    name: "Investment research",
    category: "investing",
    frequency: "weekly",
    streak: 2,
    completion: 0.6, // 60% completion
    status: "due",
    lastCompleted: "5 days ago",
    insights: "Your investment research usually focuses on tech stocks.",
    suggestion: "Consider diversifying your research to include other sectors."
  },
  {
    id: 3,
    name: "Budget adjustment",
    category: "planning",
    frequency: "monthly",
    streak: 5,
    completion: 1.0, // 100% completion
    status: "completed",
    lastCompleted: "Yesterday",
    insights: "You consistently adjust your budget on schedule.",
    suggestion: "Try implementing a zero-based budgeting approach next month."
  },
  {
    id: 4,
    name: "Financial goal review",
    category: "planning",
    frequency: "monthly",
    streak: 0,
    completion: 0.3, // 30% completion
    status: "overdue",
    lastCompleted: "32 days ago",
    insights: "You often delay reviewing long-term financial goals.",
    suggestion: "Schedule a specific day each month dedicated to goal reviews."
  }
];

// Mock data for habit statistics
const habitCompletionData = [
  { name: "Completed", value: 62 },
  { name: "Missed", value: 38 },
];

const habitCategoryData = [
  { name: "Tracking", value: 8 },
  { name: "Investing", value: 6 },
  { name: "Planning", value: 12 },
  { name: "Saving", value: 9 },
];

const weeklyProgressData = [
  { day: "Mon", completed: 3, missed: 1 },
  { day: "Tue", completed: 4, missed: 0 },
  { day: "Wed", completed: 2, missed: 2 },
  { day: "Thu", completed: 3, missed: 1 },
  { day: "Fri", completed: 2, missed: 2 },
  { day: "Sat", completed: 5, missed: 0 },
  { day: "Sun", completed: 4, missed: 1 },
];

const COLORS = ["#10B981", "#EF4444"];
const CATEGORY_COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"];

const HabitTracker = () => {
  const [habits, setHabits] = useState(mockHabits);
  const [activeTab, setActiveTab] = useState("habits");

  const completeHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { 
        ...habit, 
        status: "completed", 
        lastCompleted: "Today", 
        streak: habit.streak + 1,
        completion: 1.0 
      } : habit
    ));
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "active":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "due":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "overdue":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold fin-gradient-text">Financial Habit Tracker</h2>
        <Button className="flex items-center gap-1">
          <Compass size={16} />
          Next Step
        </Button>
      </div>
      
      <Tabs defaultValue="habits" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="habits">My Habits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="habits" className="mt-0">
          <div className="space-y-4">
            <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-1">Mindful Finance Suggestion</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Based on your recent activity, we suggest focusing on investment research today.
                    Your portfolio could benefit from diversification.
                  </p>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Lightbulb className="h-4 w-4" />
                      Start Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            {habits.map(habit => (
              <Card key={habit.id} className="overflow-hidden fin-hover-effect">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      {getStatusIndicator(habit.status)}
                      <div>
                        <h3 className="text-lg font-semibold">{habit.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="capitalize">
                            {habit.category}
                          </Badge>
                          <span>•</span>
                          <span className="capitalize">{habit.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {habit.streak} streak
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Completion</span>
                      <span>{Math.round(habit.completion * 100)}%</span>
                    </div>
                    <Progress value={habit.completion * 100} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex items-start gap-2 text-sm">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">Last completed: {habit.lastCompleted}</span>
                  </div>
                  
                  <div className="mt-3 flex items-start gap-2 text-sm">
                    <Lightbulb className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground">{habit.suggestion}</p>
                  </div>
                  
                  <div className="mt-4 flex justify-end gap-2">
                    {habit.status !== "completed" && (
                      <Button 
                        size="sm" 
                        onClick={() => completeHabit(habit.id)}
                        className="flex items-center gap-1"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Complete
                      </Button>
                    )}
                    {habit.status === "completed" && (
                      <Button size="sm" variant="outline" disabled>
                        Completed
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                Habit Completion Rate
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={habitCompletionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {habitCompletionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Progress
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" fill="#10B981" />
                    <Bar dataKey="missed" name="Missed" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Compass className="h-5 w-5 text-primary" />
                Habits by Category
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={habitCategoryData}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip />
                    <Bar 
                      dataKey="value" 
                      name="Number of Habits"
                      radius={[0, 4, 4, 0]}
                    >
                      {habitCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HabitTracker;
