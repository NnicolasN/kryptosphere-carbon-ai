import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowRight, Sparkles, TrendingDown, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Recommendations = () => {
  // Info banner about pre-bilan
  const hasPreBilan = true; // This would come from state/context in real app

  const leverCategories = [
    {
      title: "Réduire",
      subtitle: "Quantité",
      icon: TrendingDown,
      color: "success",
      levers: [
        {
          name: "Optimisation logistique",
          impact: "450",
          cost: "120 k€",
          efficiency: "26",
          relevance: "élevée"
        },
        {
          name: "Réduction km parcourus",
          impact: "320",
          cost: "80 k€",
          efficiency: "25",
          relevance: "élevée"
        }
      ]
    },
    {
      title: "Transférer",
      subtitle: "Report modal",
      icon: ArrowRight,
      color: "accent",
      levers: [
        {
          name: "Voiture → Transports en commun",
          impact: "280",
          cost: "50 k€",
          efficiency: "18",
          relevance: "moyenne"
        },
        {
          name: "Aérien → Train",
          impact: "380",
          cost: "95 k€",
          efficiency: "25",
          relevance: "élevée"
        }
      ]
    },
    {
      title: "Améliorer",
      subtitle: "Spécification",
      icon: Sparkles,
      color: "warning",
      levers: [
        {
          name: "Thermique → Électrique",
          impact: "520",
          cost: "450 k€",
          efficiency: "86",
          relevance: "élevée"
        },
        {
          name: "Énergie verte",
          impact: "620",
          cost: "280 k€",
          efficiency: "45",
          relevance: "élevée"
        }
      ]
    }
  ];

  const getRelevanceBadge = (relevance: string) => {
    const variants: Record<string, string> = {
      élevée: "bg-success/20 text-success border-success/30",
      moyenne: "bg-warning/20 text-warning border-warning/30"
    };
    return variants[relevance] || variants.moyenne;
  };

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
              Leviers de décarbonation identifiés par l'IA
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <LinkIcon className="w-4 h-4" />
              <span>Interconnexions gérées – aucun double comptage</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {leverCategories.map((category, idx) => (
              <div key={idx} className="space-y-4">
                <div className="text-center pb-4 border-b-2 border-primary/20">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-3">
                    <category.icon className={`w-6 h-6 text-${category.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                </div>

                <div className="space-y-4">
                  {category.levers.map((lever, leverIdx) => (
                    <Card key={leverIdx} className="hover:shadow-hover transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-start justify-between">
                          <span>{lever.name}</span>
                          <Badge className={getRelevanceBadge(lever.relevance)}>
                            {lever.relevance}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">Impact CO₂</div>
                            <div className="font-semibold text-success">
                              {lever.impact} tCO₂e
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground text-xs mb-1">Coût</div>
                            <div className="font-semibold">{lever.cost}</div>
                          </div>
                        </div>
                        <div className="pt-2 border-t">
                          <div className="text-muted-foreground text-xs mb-1">€/tCO₂e</div>
                          <div className="font-bold text-accent">{lever.efficiency} €</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
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
