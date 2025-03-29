
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bookmark, BookmarkCheck, TrendingUp, TrendingDown, 
  Clock, Calendar, ExternalLink, HelpCircle, Info
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for news articles
const mockArticles = [
  {
    id: 1,
    title: "Federal Reserve Cuts Interest Rates by 25 Basis Points",
    source: "Financial Times",
    date: "4 hours ago",
    category: "economy",
    summary: "The Federal Reserve announced a 25 basis point cut to interest rates, citing moderate inflation and labor market concerns.",
    concepts: [
      { term: "Basis Points", definition: "A basis point is one hundredth of one percent, used for measuring interest rate changes." },
      { term: "Federal Reserve", definition: "The central banking system of the United States, responsible for monetary policy and financial stability." }
    ],
    trending: "up",
    saved: false
  },
  {
    id: 2,
    title: "Tech Stocks Rally Following Positive Earnings Reports",
    source: "Bloomberg",
    date: "6 hours ago",
    category: "stocks",
    summary: "Major technology stocks saw significant gains after quarterly earnings reports exceeded analyst expectations.",
    concepts: [
      { term: "Earnings Report", definition: "A quarterly financial statement issued by public companies to report their performance." },
      { term: "Market Rally", definition: "A period of sustained increases in the overall market or sector prices." }
    ],
    trending: "up",
    saved: true
  },
  {
    id: 3,
    title: "Cryptocurrency Market Faces Regulatory Challenges",
    source: "CoinDesk",
    date: "Yesterday",
    category: "crypto",
    summary: "New regulatory frameworks proposed by several countries may impact cryptocurrency markets and exchanges.",
    concepts: [
      { term: "Regulatory Framework", definition: "The system of regulations and guidelines that govern financial activities and markets." },
      { term: "Cryptocurrency Exchange", definition: "A platform where users can buy, sell or trade cryptocurrencies for other digital assets or fiat currencies." }
    ],
    trending: "down",
    saved: false
  },
  {
    id: 4,
    title: "Global Supply Chain Disruptions Impact Commodity Prices",
    source: "Reuters",
    date: "2 days ago",
    category: "commodities",
    summary: "Ongoing supply chain issues have caused volatility in commodity markets, particularly affecting metals and agricultural products.",
    concepts: [
      { term: "Supply Chain", definition: "The network of organizations, people, activities, information, and resources involved in delivering a product or service." },
      { term: "Commodity Markets", definition: "Markets where raw or primary products are exchanged, often traded on regulated commodity exchanges." }
    ],
    trending: "up",
    saved: false
  }
];

const NewsFeed = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [activeTab, setActiveTab] = useState("all");

  const toggleSaved = (id: number) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, saved: !article.saved } : article
    ));
  };

  const filteredArticles = activeTab === "all" 
    ? articles 
    : articles.filter(article => article.category === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold fin-gradient-text">Financial News</h2>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="economy">Economy</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="commodities">Commodities</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="space-y-4">
            {filteredArticles.map(article => (
              <Card key={article.id} className="overflow-hidden fin-hover-effect">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{article.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleSaved(article.id)}
                      className="ml-2 flex-shrink-0"
                    >
                      {article.saved ? 
                        <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                        <Bookmark className="h-5 w-5" />
                      }
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.source}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.date}
                    </span>
                    {article.trending && (
                      <Badge variant={article.trending === "up" ? "default" : "destructive"} className="flex items-center">
                        {article.trending === "up" ? 
                          <TrendingUp className="h-3 w-3 mr-1" /> : 
                          <TrendingDown className="h-3 w-3 mr-1" />
                        }
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-foreground mb-4">{article.summary}</p>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center">
                      <Info className="h-4 w-4 mr-1 text-primary" />
                      Key Concepts:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {article.concepts.map((concept, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="flex items-center cursor-help">
                                {concept.term}
                                <HelpCircle className="h-3 w-3 ml-1 text-muted-foreground" />
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs p-4">
                              <p className="font-semibold">{concept.term}</p>
                              <p className="text-sm mt-1">{concept.definition}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="text-xs flex items-center">
                      Read Full Article
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsFeed;
