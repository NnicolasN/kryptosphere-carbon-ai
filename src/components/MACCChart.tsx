import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lightbulb, Target, Zap, Clock, Building2 } from "lucide-react";

interface Lever {
  id: string;
  name: string;
  co2Reduction: number; // tCO₂e
  marginalCost: number; // €/tCO₂e (negative = savings)
  roi: "< 5 ans" | "> 5 ans";
  badge: "Rapide à déployer" | "Structurant" | "Long terme";
  category: "reduction" | "transfer" | "specification";
  scope: 1 | 2 | 3;
  businessUnit: string;
  status: "planned" | "in_progress" | "completed";
}

const leversData: Lever[] = [
  {
    id: "1",
    name: "Optimisation logistique",
    co2Reduction: 450,
    marginalCost: -45,
    roi: "< 5 ans",
    badge: "Rapide à déployer",
    category: "reduction",
    scope: 3,
    businessUnit: "Transport",
    status: "planned",
  },
  {
    id: "2",
    name: "LED & éclairage intelligent",
    co2Reduction: 180,
    marginalCost: -30,
    roi: "< 5 ans",
    badge: "Rapide à déployer",
    category: "specification",
    scope: 2,
    businessUnit: "Bâtiments",
    status: "in_progress",
  },
  {
    id: "3",
    name: "Télétravail optimisé",
    co2Reduction: 220,
    marginalCost: -15,
    roi: "< 5 ans",
    badge: "Rapide à déployer",
    category: "reduction",
    scope: 3,
    businessUnit: "RH",
    status: "completed",
  },
  {
    id: "4",
    name: "Report modal train",
    co2Reduction: 380,
    marginalCost: 25,
    roi: "< 5 ans",
    badge: "Structurant",
    category: "transfer",
    scope: 3,
    businessUnit: "Transport",
    status: "planned",
  },
  {
    id: "5",
    name: "Énergie verte (PPA)",
    co2Reduction: 620,
    marginalCost: 45,
    roi: "> 5 ans",
    badge: "Structurant",
    category: "specification",
    scope: 2,
    businessUnit: "Énergie",
    status: "planned",
  },
  {
    id: "6",
    name: "Électrification flotte",
    co2Reduction: 520,
    marginalCost: 86,
    roi: "> 5 ans",
    badge: "Long terme",
    category: "specification",
    scope: 1,
    businessUnit: "Transport",
    status: "planned",
  },
  {
    id: "7",
    name: "Pompes à chaleur",
    co2Reduction: 340,
    marginalCost: 120,
    roi: "> 5 ans",
    badge: "Long terme",
    category: "specification",
    scope: 1,
    businessUnit: "Bâtiments",
    status: "planned",
  },
  {
    id: "8",
    name: "Hydrogène vert",
    co2Reduction: 280,
    marginalCost: 180,
    roi: "> 5 ans",
    badge: "Long terme",
    category: "specification",
    scope: 1,
    businessUnit: "Industrie",
    status: "planned",
  },
];

const MACCChart = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [scopeFilter, setScopeFilter] = useState<string>("all");
  const [businessUnitFilter, setBusinessUnitFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [hoveredLever, setHoveredLever] = useState<string | null>(null);

  // Filter levers
  const filteredLevers = leversData.filter((lever) => {
    if (categoryFilter !== "all" && lever.category !== categoryFilter) return false;
    if (scopeFilter !== "all" && lever.scope !== parseInt(scopeFilter)) return false;
    if (businessUnitFilter !== "all" && lever.businessUnit !== businessUnitFilter) return false;
    if (statusFilter !== "all" && lever.status !== statusFilter) return false;
    return true;
  });

  // Sort by marginal cost (ascending)
  const sortedLevers = [...filteredLevers].sort((a, b) => a.marginalCost - b.marginalCost);

  // Calculate chart dimensions
  const chartHeight = 400;
  const chartWidth = 800;
  const padding = { top: 60, right: 40, bottom: 80, left: 80 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate scales
  const totalCO2 = sortedLevers.reduce((sum, l) => sum + l.co2Reduction, 0);
  const minCost = Math.min(...sortedLevers.map((l) => l.marginalCost), -50);
  const maxCost = Math.max(...sortedLevers.map((l) => l.marginalCost), 200);

  const xScale = (value: number) => (value / totalCO2) * innerWidth;
  const yScale = (value: number) => {
    const range = maxCost - minCost;
    return innerHeight - ((value - minCost) / range) * innerHeight;
  };

  // Calculate target line (e.g., 60% of total for 2030 target)
  const target2030 = totalCO2 * 0.6;

  // Get bar color based on marginal cost
  const getBarColor = (cost: number) => {
    if (cost < 0) return "hsl(var(--success))";
    if (cost < 60) return "hsl(var(--warning))";
    return "hsl(25, 70%, 45%)"; // Brown/rust color
  };

  const getBadgeVariant = (badge: Lever["badge"]) => {
    switch (badge) {
      case "Rapide à déployer":
        return "bg-success/20 text-success border-success/30";
      case "Structurant":
        return "bg-accent/20 text-accent border-accent/30";
      case "Long terme":
        return "bg-warning/20 text-warning border-warning/30";
    }
  };

  // Calculate cumulative positions
  let cumulativeX = 0;
  const bars = sortedLevers.map((lever) => {
    const barWidth = xScale(lever.co2Reduction);
    const barHeight = Math.abs(yScale(lever.marginalCost) - yScale(0));
    const x = cumulativeX;
    const y = lever.marginalCost >= 0 ? yScale(lever.marginalCost) : yScale(0);
    cumulativeX += barWidth;
    return { ...lever, x, y, barWidth, barHeight };
  });

  // Calculate priority levers for AI insight
  const priorityLevers = sortedLevers.filter((l) => l.marginalCost < 50).slice(0, 3);
  const priorityReduction = priorityLevers.reduce((sum, l) => sum + l.co2Reduction, 0);
  const priorityPercentage = Math.round((priorityReduction / target2030) * 100);

  const uniqueBusinessUnits = [...new Set(leversData.map((l) => l.businessUnit))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Filtres d'analyse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Business Unit
              </label>
              <Select value={businessUnitFilter} onValueChange={setBusinessUnitFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  {uniqueBusinessUnits.map((bu) => (
                    <SelectItem key={bu} value={bu}>
                      {bu}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Catégorie de levier
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="reduction">Réduction</SelectItem>
                  <SelectItem value="transfer">Transfert</SelectItem>
                  <SelectItem value="specification">Spécification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Scope</label>
              <Select value={scopeFilter} onValueChange={setScopeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="1">Scope 1</SelectItem>
                  <SelectItem value="2">Scope 2</SelectItem>
                  <SelectItem value="3">Scope 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="planned">Planifié</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="completed">Complété</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insight */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">
                Insight IA – Priorisation optimale
              </h4>
              <p className="text-muted-foreground">
                Les leviers{" "}
                <span className="font-semibold text-foreground">
                  {priorityLevers.map((l) => l.name).join(", ")}
                </span>{" "}
                permettent d'atteindre{" "}
                <span className="font-bold text-success">{priorityPercentage}%</span> de la
                cible 2030 avec un ROI inférieur à 5 ans. Ces actions génèrent des économies
                nettes ou présentent un coût marginal modéré.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MACC Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Marginal Abatement Cost Curve (MACC)
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Classement des leviers par coût marginal croissant – inspiré McKinsey & KPMG
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full min-w-[600px]"
              style={{ maxWidth: "100%" }}
            >
              {/* Background */}
              <rect width={chartWidth} height={chartHeight} fill="hsl(var(--card))" />

              {/* Grid lines */}
              <g className="text-muted-foreground/30">
                {[-50, 0, 50, 100, 150, 200].map((tick) => (
                  <g key={tick}>
                    <line
                      x1={padding.left}
                      y1={yScale(tick) + padding.top}
                      x2={chartWidth - padding.right}
                      y2={yScale(tick) + padding.top}
                      stroke="currentColor"
                      strokeDasharray={tick === 0 ? "0" : "4,4"}
                      strokeWidth={tick === 0 ? 2 : 1}
                    />
                    <text
                      x={padding.left - 10}
                      y={yScale(tick) + padding.top + 4}
                      textAnchor="end"
                      className="text-xs fill-muted-foreground"
                    >
                      {tick}
                    </text>
                  </g>
                ))}
              </g>

              {/* Y-axis label */}
              <text
                x={20}
                y={chartHeight / 2}
                transform={`rotate(-90, 20, ${chartHeight / 2})`}
                textAnchor="middle"
                className="text-sm fill-muted-foreground font-medium"
              >
                Coût marginal (€/tCO₂e)
              </text>

              {/* X-axis label */}
              <text
                x={chartWidth / 2}
                y={chartHeight - 15}
                textAnchor="middle"
                className="text-sm fill-muted-foreground font-medium"
              >
                Potentiel de réduction cumulé (tCO₂e)
              </text>

              {/* Bars */}
              <g transform={`translate(${padding.left}, ${padding.top})`}>
                {bars.map((bar, index) => (
                  <g
                    key={bar.id}
                    onMouseEnter={() => setHoveredLever(bar.id)}
                    onMouseLeave={() => setHoveredLever(null)}
                    className="cursor-pointer transition-opacity"
                  >
                    <rect
                      x={bar.x + 1}
                      y={bar.y}
                      width={Math.max(bar.barWidth - 2, 4)}
                      height={bar.barHeight}
                      fill={getBarColor(bar.marginalCost)}
                      opacity={hoveredLever === null || hoveredLever === bar.id ? 1 : 0.4}
                      rx={2}
                      className="transition-all duration-200"
                    />
                    {/* Label on bar */}
                    {bar.barWidth > 40 && (
                      <text
                        x={bar.x + bar.barWidth / 2}
                        y={bar.marginalCost >= 0 ? bar.y - 8 : bar.y + bar.barHeight + 14}
                        textAnchor="middle"
                        className="text-[10px] fill-foreground font-medium"
                        style={{ pointerEvents: "none" }}
                      >
                        {bar.name.length > 15 ? bar.name.slice(0, 12) + "..." : bar.name}
                      </text>
                    )}
                  </g>
                ))}

                {/* Target 2030 line */}
                <line
                  x1={xScale(target2030)}
                  y1={-padding.top + 20}
                  x2={xScale(target2030)}
                  y2={innerHeight + 20}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  strokeDasharray="8,4"
                />
                <rect
                  x={xScale(target2030) - 55}
                  y={-padding.top + 10}
                  width={110}
                  height={24}
                  fill="hsl(var(--primary))"
                  rx={4}
                />
                <text
                  x={xScale(target2030)}
                  y={-padding.top + 26}
                  textAnchor="middle"
                  className="text-xs fill-primary-foreground font-semibold"
                >
                  Cible 2030 atteinte
                </text>
              </g>

              {/* Zero line indicator */}
              <text
                x={chartWidth - padding.right + 10}
                y={yScale(0) + padding.top + 4}
                className="text-xs fill-muted-foreground font-medium"
              >
                0 €
              </text>

              {/* Legend */}
              <g transform={`translate(${padding.left}, ${chartHeight - 45})`}>
                <rect x={0} y={0} width={12} height={12} fill="hsl(var(--success))" rx={2} />
                <text x={18} y={10} className="text-xs fill-muted-foreground">
                  Économies nettes
                </text>
                <rect x={120} y={0} width={12} height={12} fill="hsl(var(--warning))" rx={2} />
                <text x={138} y={10} className="text-xs fill-muted-foreground">
                  Coût modéré
                </text>
                <rect x={240} y={0} width={12} height={12} fill="hsl(25, 70%, 45%)" rx={2} />
                <text x={258} y={10} className="text-xs fill-muted-foreground">
                  Fort CAPEX
                </text>
              </g>
            </svg>
          </div>

          {/* Tooltip / Details for hovered lever */}
          {hoveredLever && (
            <div className="mt-4 p-4 bg-secondary/50 rounded-lg border animate-in fade-in duration-200">
              {(() => {
                const lever = sortedLevers.find((l) => l.id === hoveredLever);
                if (!lever) return null;
                return (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{lever.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Scope {lever.scope} • {lever.businessUnit}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-success">
                          {lever.co2Reduction} tCO₂e
                        </div>
                        <div className="text-xs text-muted-foreground">Réduction</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-lg font-bold ${
                            lever.marginalCost < 0 ? "text-success" : "text-foreground"
                          }`}
                        >
                          {lever.marginalCost} €/tCO₂e
                        </div>
                        <div className="text-xs text-muted-foreground">Coût marginal</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">ROI {lever.roi}</span>
                      </div>
                      <Badge className={getBadgeVariant(lever.badge)}>{lever.badge}</Badge>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lever Details Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Détail des leviers prioritaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold text-muted-foreground">
                    Levier
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-muted-foreground">
                    tCO₂e évitées
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-muted-foreground">
                    €/tCO₂e
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-muted-foreground">
                    ROI
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-muted-foreground">
                    Badge
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-muted-foreground">
                    Scope
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedLevers.map((lever, index) => (
                  <tr
                    key={lever.id}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-sm flex-shrink-0"
                          style={{ backgroundColor: getBarColor(lever.marginalCost) }}
                        />
                        <span className="font-medium">{lever.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 font-semibold text-success">
                      {lever.co2Reduction}
                    </td>
                    <td
                      className={`text-right py-3 px-2 font-semibold ${
                        lever.marginalCost < 0 ? "text-success" : ""
                      }`}
                    >
                      {lever.marginalCost}
                    </td>
                    <td className="text-center py-3 px-2">{lever.roi}</td>
                    <td className="text-center py-3 px-2">
                      <Badge className={`${getBadgeVariant(lever.badge)} text-xs`}>
                        {lever.badge}
                      </Badge>
                    </td>
                    <td className="text-center py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        Scope {lever.scope}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MACCChart;
