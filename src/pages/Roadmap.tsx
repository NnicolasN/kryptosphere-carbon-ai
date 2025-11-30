import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Edit, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Roadmap = () => {
  const trajectoryData = [
    { year: 2024, baseline: 2500, trajectory: 2500 },
    { year: 2026, baseline: 2550, trajectory: 2100 },
    { year: 2028, baseline: 2600, trajectory: 1750 },
    { year: 2030, baseline: 2650, trajectory: 1400 },
    { year: 2035, baseline: 2700, trajectory: 900 },
    { year: 2040, baseline: 2750, trajectory: 550 },
    { year: 2045, baseline: 2800, trajectory: 300 },
    { year: 2050, baseline: 2850, trajectory: 100 }
  ];

  const leversTable = [
    {
      lever: "Optimisation logistique",
      coverage: "35%",
      emissions: "18%",
      impact: "450"
    },
    {
      lever: "Thermique → Électrique",
      coverage: "60%",
      emissions: "25%",
      impact: "520"
    },
    {
      lever: "Énergie verte",
      coverage: "80%",
      emissions: "30%",
      impact: "620"
    },
    {
      lever: "Aérien → Train",
      coverage: "25%",
      emissions: "12%",
      impact: "380"
    }
  ];

  const summary = {
    reduction: "64%",
    efficiency: "42 €/tCO₂e",
    capex: "1.2 M€",
    opex: "180 k€/an",
    priorities: [
      "Électrification de la flotte (2025-2027)",
      "Transition énergétique (2026-2030)",
      "Optimisation logistique (immédiat)"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark to-primary">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Votre trajectoire de décarbonation
            </h1>
            <p className="text-primary-foreground/80">
              Roadmap carbone personnalisée sur horizon 2050
            </p>
          </div>

          {/* Chart Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-success" />
                Trajectoire de réduction des émissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trajectoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    label={{ value: 'tCO₂e', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="baseline" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    name="Baseline"
                    strokeDasharray="5 5"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="trajectory" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    name="Trajectoire recommandée"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Levers Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Leviers prioritaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-semibold text-sm">Levier</th>
                        <th className="text-center py-3 px-2 font-semibold text-sm">% activité</th>
                        <th className="text-center py-3 px-2 font-semibold text-sm">% émissions</th>
                        <th className="text-right py-3 px-2 font-semibold text-sm">tCO₂e évitées</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leversTable.map((row, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-muted/30">
                          <td className="py-3 px-2 font-medium">{row.lever}</td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="secondary">{row.coverage}</Badge>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <Badge variant="secondary">{row.emissions}</Badge>
                          </td>
                          <td className="py-3 px-2 text-right font-semibold text-success">
                            {row.impact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Executive Summary */}
            <Card className="lg:col-span-1 bg-gradient-to-br from-accent/10 to-primary/10">
              <CardHeader>
                <CardTitle>Résumé exécutif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Réduction totale</div>
                  <div className="text-3xl font-bold text-success">{summary.reduction}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Efficacité moyenne</div>
                  <div className="text-2xl font-bold text-accent">{summary.efficiency}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">CAPEX</div>
                    <div className="font-semibold">{summary.capex}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">OPEX</div>
                    <div className="font-semibold">{summary.opex}</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm font-semibold mb-3">Actions prioritaires</div>
                  <ol className="space-y-2 text-sm">
                    {summary.priorities.map((priority, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="font-semibold text-accent">{idx + 1}.</span>
                        <span>{priority}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              Exporter la feuille de route
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-card">
              <Edit className="w-5 h-5" />
              Modifier les paramètres
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
