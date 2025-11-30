import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, Zap, Cloud, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CarbonTracker = () => {
  const navigate = useNavigate();
  const [connected, setConnected] = useState({
    email: false,
    accounting: false,
    energy: false,
    cloud: false,
  });

  const connectors = [
    {
      id: "email",
      icon: Mail,
      title: "Email professionnel",
      description: "Lecture automatique des factures (SNCF, Air France, Uber...)",
      providers: "Gmail, Outlook, Exchange",
    },
    {
      id: "accounting",
      icon: FileText,
      title: "Comptabilité",
      description: "Import des données financières et achats",
      providers: "Sage, Pennylane, QuickBooks",
    },
    {
      id: "energy",
      icon: Zap,
      title: "Fournisseurs d'énergie",
      description: "Consommation électrique et gaz",
      providers: "EDF, Engie, Total Energies",
    },
    {
      id: "cloud",
      icon: Cloud,
      title: "Fournisseurs cloud",
      description: "Empreinte numérique et serveurs",
      providers: "OVH, AWS, Azure, GCP",
    },
  ];

  const extractedData = [
    { label: "Factures détectées ce mois-ci", value: "47", color: "text-primary" },
    { label: "km estimés (déplacements pro)", value: "3 250", color: "text-accent" },
    { label: "kWh consommés", value: "12 840", color: "text-secondary" },
    { label: "Achats récurrents identifiés", value: "23", color: "text-primary-dark" },
  ];

  const handleConnect = (id: string) => {
    setConnected({ ...connected, [id]: true });
  };

  const allConnected = Object.values(connected).every(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Carbon Data Tracker <span className="text-muted-foreground text-2xl">(Optionnel)</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Analyse automatique de vos factures, emails et fournisseurs pour estimer votre empreinte carbone actuelle.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Connectors */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Connectez vos sources de données</h2>
            {connectors.map((connector) => {
              const Icon = connector.icon;
              const isConnected = connected[connector.id as keyof typeof connected];
              
              return (
                <Card key={connector.id} className="relative overflow-hidden">
                  {isConnected && (
                    <div className="absolute top-4 right-4">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{connector.title}</CardTitle>
                    </div>
                    <CardDescription>{connector.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Compatible : {connector.providers}
                    </p>
                    <Button
                      onClick={() => handleConnect(connector.id)}
                      disabled={isConnected}
                      variant={isConnected ? "secondary" : "default"}
                      className="w-full"
                    >
                      {isConnected ? "Connecté" : "Connecter"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Right Column - Extracted Data */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Données extraites automatiquement</h2>
            
            <div className="grid gap-4">
              {extractedData.map((data, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground">{data.label}</p>
                      <p className={`text-3xl font-bold ${data.color}`}>{data.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Prêt pour l'analyse</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {allConnected 
                    ? "Toutes vos sources sont connectées. Générez maintenant votre pré-bilan carbone automatique."
                    : "Connectez au moins une source de données pour générer votre pré-bilan carbone."}
                </p>
                <Button
                  onClick={() => navigate("/pre-bilan")}
                  disabled={!allConnected}
                  variant="premium"
                  className="w-full"
                  size="lg"
                >
                  Générer mon pré-bilan carbone
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Skip Option */}
            <div className="text-center">
              <Button
                onClick={() => navigate("/recommendations")}
                variant="ghost"
              >
                Passer cette étape
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTracker;
