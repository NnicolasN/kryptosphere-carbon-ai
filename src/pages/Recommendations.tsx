import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import MACCChart from "@/components/MACCChart";

const Recommendations = () => {
  // Info banner about pre-bilan
  const hasPreBilan = true; // This would come from state/context in real app

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Pre-bilan info banner */}
          {hasPreBilan && (
            <Card className="mb-6 bg-accent/10 border-accent">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  ✓ Les leviers recommandés ont été ajustés à partir de votre pré-bilan carbone automatique.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Leviers prioritaires – MACC
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <LinkIcon className="w-4 h-4" />
              <span>Marginal Abatement Cost Curve – Priorisation par coût marginal</span>
            </div>
          </div>

          {/* MACC Chart Section */}
          <MACCChart />

          <div className="flex justify-center mt-8">
            <Link to="/roadmap">
              <Button variant="premium" size="lg" className="px-12">
                Générer la trajectoire carbone
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
