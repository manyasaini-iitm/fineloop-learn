
import Navbar from "@/components/Navbar";
import FinancialGlossary from "@/components/FinancialGlossary";

const Glossary = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-6">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Financial Glossary</h1>
        <FinancialGlossary />
      </main>
    </div>
  );
};

export default Glossary;
