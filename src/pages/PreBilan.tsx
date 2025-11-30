import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Factory, Zap, ShoppingCart, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PreBilan = () => {
  const navigate = useNavigate();

  const scopes = [
    {
      id: 1,
      title: "Scope 1",
      description: "Émissions directes (combustion, process)",
      value: 450,
      percentage: 25,
      color: "bg-primary",
      icon: Factory,
    },
    {
      id: 2,
      title: "Scope 2",
      description: "Émissions indirectes (électricité, chaleur)",
      value: 320,
      percentage: 18,
      color: "bg-accent",
      icon: Zap,
    },
    {
      id: 3,
      title: "Scope 3",
      description: "Autres émissions indirectes (achats, transport)",
      value: 1030,
      percentage: 57,
      color: "bg-secondary",
      icon: ShoppingCart,
    },
  ];

  const totalEmissions = scopes.reduce((sum, scope) => sum + scope.value, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-full mb-4">
            <TrendingDown className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Pré-bilan carbone généré automatiquement
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Votre empreinte carbone estimée à partir de l'analyse automatique de vos données.
          </p>
        </div>

        {/* Total Emissions Card */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Total estimé</p>
              <p className="text-6xl font-bold text-primary mb-2">
                {totalEmissions.toLocaleString()}
              </p>
              <p className="text-xl text-muted-foreground">tonnes CO₂e / an</p>
            </div>
          </CardContent>
        </Card>

        {/* Scopes Breakdown */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Répartition par scope</h2>
          
          {scopes.map((scope) => {
            const Icon = scope.icon;
            return (
              <Card key={scope.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${scope.color}/10`}>
                        <Icon className={`w-6 h-6 ${scope.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{scope.title}</CardTitle>
                        <CardDescription>{scope.description}</CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{scope.value}</p>
                      <p className="text-sm text-muted-foreground">tCO₂e</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Part du total</span>
                      <span className="font-semibold">{scope.percentage}%</span>
                    </div>
                    <Progress value={scope.percentage} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Explanation */}
        <Card className="bg-accent/10 border-accent/20 mb-8">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Comment ces données seront utilisées ?</h3>
            <p className="text-muted-foreground">
              Ce pré-bilan carbone automatique permettra de personnaliser précisément les leviers de décarbonation 
              recommandés par l'IA. Les actions prioritaires seront ajustées en fonction de vos sources d'émissions 
              les plus importantes.
            </p>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/recommendations")}
            variant="premium"
            size="lg"
            className="px-8"
          >
            Utiliser ce pré-bilan pour générer mes leviers IA
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreBilan;
