
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AreaChart, LineChart, BarChart, Area, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PlusCircle, TrendingUp, TrendingDown, Search, Star, AlertCircle, Info, BarChart2 } from "lucide-react";

// Mock data for watchlist items
const mockWatchlistData = [
  {
    id: 1,
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 167.63,
    change: 2.48,
    changePct: 1.52,
    category: "stocks",
    starred: true,
    data: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 150 + Math.random() * 30
    })),
    insights: "Apple showed strong quarterly results with iPhone sales exceeding expectations."
  },
  {
    id: 2,
    symbol: "BTC",
    name: "Bitcoin",
    price: 37493.22,
    change: -826.14,
    changePct: -2.16,
    category: "crypto",
    starred: false,
    data: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 35000 + Math.random() * 5000
    })),
    insights: "Bitcoin is experiencing volatility due to regulatory news from major markets."
  },
  {
    id: 3,
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 343.11,
    change: 4.92,
    changePct: 1.45,
    category: "stocks",
    starred: true,
    data: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 330 + Math.random() * 20
    })),
    insights: "Microsoft's cloud services growth continues to drive positive investor sentiment."
  },
  {
    id: 4,
    symbol: "ETH",
    name: "Ethereum",
    price: 2032.76,
    change: 45.29,
    changePct: 2.28,
    category: "crypto",
    starred: false,
    data: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 1900 + Math.random() * 300
    })),
    insights: "Ethereum upgrade implementation has created positive momentum in the market."
  },
  {
    id: 5,
    symbol: "XAU",
    name: "Gold",
    price: 2311.15,
    change: 15.32,
    changePct: 0.67,
    category: "commodities",
    starred: true,
    data: Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      value: 2250 + Math.random() * 100
    })),
    insights: "Gold prices continue to rise amid global economic uncertainty and inflation concerns."
  }
];

const WatchlistDashboard = () => {
  const [watchlist, setWatchlist] = useState(mockWatchlistData);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStarred = (id: number) => {
    setWatchlist(watchlist.map(item => 
      item.id === id ? { ...item, starred: !item.starred } : item
    ));
  };

  // Filter based on active tab and search query
  const filteredWatchlist = watchlist
    .filter(item => activeTab === "all" || item.category === activeTab)
    .filter(item => 
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold fin-gradient-text">Watchlist Dashboard</h2>
        <Button className="flex items-center gap-1">
          <PlusCircle size={16} />
          Add Asset
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by symbol or name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Assets</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {filteredWatchlist.length === 0 ? (
            <Card className="p-6 text-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium">No assets found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or add new assets to your watchlist.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredWatchlist.map(item => (
                <Card key={item.id} className="overflow-hidden fin-hover-effect">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{item.symbol}</h3>
                          <Badge variant="outline" className="font-normal capitalize">
                            {item.category}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => toggleStarred(item.id)}
                            className="p-0 h-6 w-6"
                          >
                            <Star className={`h-5 w-5 ${item.starred ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-medium">
                          {item.category === "crypto" || item.category === "commodities" ? "$" : ""}
                          {item.price.toLocaleString()}
                        </div>
                        <div className={`flex items-center justify-end gap-1 ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          <span>{item.change >= 0 ? "+" : ""}{item.change.toFixed(2)} ({item.change >= 0 ? "+" : ""}{item.changePct.toFixed(2)}%)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-36 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={item.data}>
                          <defs>
                            <linearGradient id={`colorGradient-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={item.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0.8}/>
                              <stop offset="95%" stopColor={item.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                          <XAxis dataKey="day" tickLine={false} axisLine={false} />
                          <YAxis hide={true} domain={['dataMin - 2', 'dataMax + 2']} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            formatter={(value: number) => [value.toFixed(2), 'Value']}
                            labelFormatter={(day) => `Day ${day}`}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={item.change >= 0 ? "#10B981" : "#EF4444"} 
                            fillOpacity={1} 
                            fill={`url(#colorGradient-${item.id})`} 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="flex items-start gap-2 text-sm">
                      <Info className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <p className="text-muted-foreground">{item.insights}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">Details</Button>
                      <Button size="sm" className="flex items-center gap-1">
                        <BarChart2 className="h-4 w-4" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WatchlistDashboard;
