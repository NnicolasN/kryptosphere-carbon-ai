import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Building2, MapPin, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [sector, setSector] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [maturity, setMaturity] = useState([3]);
  const [emissions, setEmissions] = useState<string[]>([]);

  const emissionSources = [
    { id: "transport", label: "Transport & Logistique" },
    { id: "energy", label: "Énergie & Chauffage" },
    { id: "production", label: "Production & Manufacturing" },
    { id: "digital", label: "Infrastructure Digitale" }
  ];

  const sectors = [
    { value: "industry", label: "Industrie", icon: "🏭" },
    { value: "services", label: "Services", icon: "💼" },
    { value: "retail", label: "Commerce", icon: "🛒" },
    { value: "tech", label: "Technologie", icon: "💻" }
  ];

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Profil de votre entreprise
          </h1>
          <p className="text-muted-foreground mb-8">
            Ces informations nous permettent de personnaliser l'analyse IA
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-accent" />
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Secteur d'activité</Label>
                    <Select value={sector} onValueChange={setSector}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((s) => (
                          <SelectItem key={s.value} value={s.value}>
                            <span className="flex items-center gap-2">
                              <span>{s.icon}</span>
                              {s.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Taille de l'entreprise</Label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="PME, ETI, GE..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pme">PME (&lt; 250 salariés)</SelectItem>
                        <SelectItem value="eti">ETI (250-5000 salariés)</SelectItem>
                        <SelectItem value="ge">Grande Entreprise (&gt; 5000)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Localisation principale
                    </Label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pays / Région" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">France</SelectItem>
                        <SelectItem value="eu">Union Européenne</SelectItem>
                        <SelectItem value="world">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Sources d'émissions principales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {emissionSources.map((source) => (
                      <div key={source.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={source.id}
                          checked={emissions.includes(source.id)}
                          onCheckedChange={(checked) => {
                            setEmissions(
                              checked
                                ? [...emissions, source.id]
                                : emissions.filter((e) => e !== source.id)
                            );
                          }}
                        />
                        <Label htmlFor={source.id} className="font-normal cursor-pointer">
                          {source.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Maturité climat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Débutant</span>
                      <span className="text-muted-foreground">Expert</span>
                    </div>
                    <Slider
                      value={maturity}
                      onValueChange={setMaturity}
                      min={1}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-sm font-medium text-accent">
                        Niveau {maturity[0]}/5
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Link to="/carbon-tracker" className="block">
                  <Button
                    variant="premium"
                    size="lg"
                    className="w-full"
                    disabled={!sector || !size || !location}
                  >
                    Utiliser le Carbon Data Tracker (Optionnel)
                  </Button>
                </Link>
                
                <Link to="/recommendations" className="block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    disabled={!sector || !size || !location}
                  >
                    Passer directement à l'analyse IA
                  </Button>
                </Link>
              </div>
            </div>

            {/* Preview Column */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="text-lg">Aperçu du profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Secteur</div>
                    <div className="font-medium">
                      {sector ? sectors.find(s => s.value === sector)?.label : "—"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Taille</div>
                    <div className="font-medium">
                      {size === "pme" ? "PME" : size === "eti" ? "ETI" : size === "ge" ? "GE" : "—"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Localisation</div>
                    <div className="font-medium">
                      {location === "fr" ? "France" : location === "eu" ? "UE" : location === "world" ? "International" : "—"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Sources d'émissions</div>
                    <div className="font-medium">
                      {emissions.length > 0 ? `${emissions.length} sélectionnées` : "—"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">Maturité</div>
                    <div className="font-medium">Niveau {maturity[0]}/5</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
