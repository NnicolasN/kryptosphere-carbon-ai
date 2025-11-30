import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Brain, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-decarbonation.jpg";

const Home = () => {
  const features = [
    {
      icon: Database,
      title: "Extraction automatique",
      description: "Analyse des données publiques (URD, CSRD, DPEF)"
    },
    {
      icon: Brain,
      title: "Analyse IA des leviers",
      description: "Identification des opportunités sectorielles"
    },
    {
      icon: TrendingDown,
      title: "Génération de roadmap",
      description: "Trajectoire carbone personnalisée"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark to-primary">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="Digital decarbonation visualization" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Générateur IA de Trajectoires de Décarbonation
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Basé sur l'analyse automatique des données publiques (URD, CSRD, DPEF)
            </p>
            <Link to="/profile">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Commencer la simulation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="mb-4 md:mb-0">
              <span className="font-semibold text-primary">KPMG</span> × Kryptosphere
            </div>
            <div>© 2025 Solution de décarbonation</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
