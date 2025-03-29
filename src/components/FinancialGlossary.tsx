
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  BookOpen,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for financial terms
const mockFinancialTerms = [
  {
    id: 1,
    term: "APR (Annual Percentage Rate)",
    definition: "The yearly interest rate charged for a loan or earned on an investment, expressed as a percentage.",
    category: "credit",
    saved: false,
    extended: "APR includes the interest rate and sometimes fees charged by the lender. It represents the true cost of borrowing on an annual basis, making it easier to compare different loan offers.",
    examples: [
      "A credit card with a 22% APR means you'll pay 22% interest annually on outstanding balances.",
      "Mortgage APRs typically include both the interest rate and points, origination fees, and other charges."
    ]
  },
  {
    id: 2,
    term: "ETF (Exchange-Traded Fund)",
    definition: "An investment fund traded on stock exchanges that holds assets such as stocks, bonds, or commodities.",
    category: "investing",
    saved: true,
    extended: "ETFs combine the valuation feature of a mutual fund with the tradability feature of a stock. ETFs typically have higher daily liquidity and lower fees than mutual fund shares.",
    examples: [
      "The SPDR S&P 500 ETF (SPY) tracks the performance of the S&P 500 index.",
      "Sector ETFs focus on specific industries like technology, healthcare, or energy."
    ]
  },
  {
    id: 3,
    term: "Market Capitalization",
    definition: "The total dollar market value of a company's outstanding shares, calculated by multiplying the current share price by the number of shares outstanding.",
    category: "investing",
    saved: false,
    extended: "Market capitalization (or market cap) is used to classify companies into categories such as large-cap (over $10 billion), mid-cap ($2-10 billion), and small-cap ($300 million-$2 billion).",
    examples: [
      "Apple's market cap exceeded $3 trillion in 2022, making it one of the most valuable companies in the world.",
      "Small-cap stocks often have more growth potential but also higher risk compared to large-cap stocks."
    ]
  },
  {
    id: 4,
    term: "Dividend Yield",
    definition: "A financial ratio that shows how much a company pays out in dividends each year relative to its stock price.",
    category: "investing",
    saved: false,
    extended: "Dividend yield is calculated by dividing the annual dividend per share by the price per share. It's expressed as a percentage and can be a measure of the income return on an investment.",
    examples: [
      "A stock priced at $50 with an annual dividend of $2 has a dividend yield of 4%.",
      "Utility and consumer staple companies often have higher dividend yields compared to technology companies."
    ]
  },
  {
    id: 5,
    term: "Compound Interest",
    definition: "Interest calculated on the initial principal and also on the accumulated interest from previous periods.",
    category: "saving",
    saved: true,
    extended: "Compound interest can significantly increase the value of an investment over time and is often described as 'interest on interest'. The formula for compound interest is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the interest rate, n is the number of times interest is compounded per time period, and t is the time.",
    examples: [
      "$1,000 invested at 5% annual compound interest will grow to $1,276 after 5 years.",
      "Monthly compounding results in slightly higher returns than annual compounding."
    ]
  },
  {
    id: 6,
    term: "Bull Market",
    definition: "A financial market where prices are rising or expected to rise, typically referring to a period of optimism and investor confidence.",
    category: "markets",
    saved: false,
    extended: "A bull market generally occurs when prices rise by 20% or more from recent lows. Bull markets can last for months or even years as investors maintain optimism and confidence in the market's future performance.",
    examples: [
      "The U.S. stock market experienced a bull market from 2009 to 2020 following the financial crisis.",
      "Bull markets are often characterized by increasing investor confidence, economic recovery, and rising corporate profits."
    ]
  },
  {
    id: 7,
    term: "Bear Market",
    definition: "A financial market where prices are falling or expected to fall, typically characterized by pessimism and negative investor sentiment.",
    category: "markets",
    saved: false,
    extended: "A bear market is usually declared when prices fall by 20% or more from recent highs. Bear markets are often accompanied by economic recessions and can lead to significant wealth destruction if investors panic sell.",
    examples: [
      "The COVID-19 pandemic triggered a brief but intense bear market in early 2020.",
      "During bear markets, defensive sectors like utilities and consumer staples often outperform growth-oriented sectors."
    ]
  },
  {
    id: 8,
    term: "Liquidity",
    definition: "The ease with which an asset can be converted into cash without affecting its market price.",
    category: "general",
    saved: false,
    extended: "Highly liquid assets can be quickly sold without significant loss in value. Cash is the most liquid asset, while real estate and private equity investments are examples of illiquid assets that may take time to sell at fair market value.",
    examples: [
      "Treasury bills are considered highly liquid assets because they can be easily bought and sold in the secondary market.",
      "During financial crises, even typically liquid assets can become illiquid as buyers disappear from the market."
    ]
  }
];

const categories = [
  { name: "All", value: "all" },
  { name: "Investing", value: "investing" },
  { name: "Credit", value: "credit" },
  { name: "Saving", value: "saving" },
  { name: "Markets", value: "markets" },
  { name: "General", value: "general" }
];

const FinancialGlossary = () => {
  const [terms, setTerms] = useState(mockFinancialTerms);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleSaved = (id: number) => {
    setTerms(terms.map(term => 
      term.id === id ? { ...term, saved: !term.saved } : term
    ));
  };

  const filteredTerms = terms
    .filter(term => activeCategory === "all" || term.category === activeCategory)
    .filter(term => 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
      term.definition.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold fin-gradient-text">Financial Glossary</h2>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for financial terms..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(category => (
          <Button
            key={category.value}
            variant={activeCategory === category.value ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.value)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredTerms.length === 0 ? (
          <Card className="p-6 text-center">
            <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <h3 className="text-lg font-medium">No terms found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or category filter.</p>
          </Card>
        ) : (
          filteredTerms.map(term => (
            <Card key={term.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{term.term}</h3>
                    <Badge variant="outline" className="capitalize">
                      {term.category}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleSaved(term.id)}
                    className="ml-2 flex-shrink-0"
                  >
                    {term.saved ? 
                      <BookmarkCheck className="h-5 w-5 text-primary" /> : 
                      <Bookmark className="h-5 w-5" />
                    }
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-4">{term.definition}</p>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="details" className="border-none">
                    <AccordionTrigger className="py-2 px-3 rounded-lg hover:bg-muted/50 text-sm font-medium">
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Learn More
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="py-3 px-3 bg-muted/30 rounded-lg mt-2">
                      <div className="space-y-3">
                        <p className="text-sm">{term.extended}</p>
                        
                        {term.examples && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Examples:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {term.examples.map((example, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground">{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FinancialGlossary;
