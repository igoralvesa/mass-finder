import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { ParishCard } from "../components/ParishCard";
import { FilterBar } from "../components/FilterBar";
import { ThemeToggle } from "../components/ThemeToggle";
// DADOS MOCKADOS - Substituir por chamada de API
import { mockParishes, neighborhoods, daysOfWeek } from "../data/mockData";
import { Church, Sparkles } from "lucide-react";

export function Home() {
  // TODO: Substituir dados mockados por API real
  // const [parishes, setParishes] = useState([]);
  // const [filters, setFilters] = useState({ neighborhood: '', day: '' });
  // 
  // useEffect(() => {
  //   // Buscar paróquias da API
  //   fetch('/api/parishes?' + new URLSearchParams(filters))
  //     .then(res => res.json())
  //     .then(data => setParishes(data));
  // }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Church className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">
                Mass Finder
              </h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/register-parish">
                <Button variant="ghost">Cadastrar Paróquia</Button>
              </Link>
              <Link to="/parish-login">
                <Button variant="default" className="shadow-sm">
                  Login Paróquia
                </Button>
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Title */}
          <div className="text-center space-y-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8">
              <Sparkles className="h-6 w-6 text-amber-500 opacity-40" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-700 to-primary bg-clip-text text-transparent">
              Encontre Horários de Missa Perto de Você
            </h2>
            <p className="text-lg text-muted-foreground">
              Busque missas por bairro e dia da semana
            </p>
          </div>

          {/* Filters */}
          <FilterBar neighborhoods={neighborhoods} daysOfWeek={daysOfWeek} />

          {/* Results */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Paróquias Disponíveis</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {/* DADOS MOCKADOS - Substituir mockParishes por dados da API */}
              {mockParishes.map((parish) => (
                <ParishCard
                  key={parish.id}
                  name={parish.name}
                  neighborhood={parish.neighborhood}
                  address={parish.address}
                  masses={parish.masses}
                  imageUrl={parish.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}