import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { Church, Sparkles } from "lucide-react";

export function ParishLogin() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar autenticação real com API
    // const formData = new FormData(e.target);
    // fetch('/api/auth/parish/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: formData.get('email'),
    //     password: formData.get('password')
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     localStorage.setItem('parishToken', data.token);
    //     navigate('/parish');
    //   })
    //   .catch(err => console.error('Erro no login:', err));
    
    // MOCK - Navega diretamente sem autenticação
    navigate("/parish");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background flex items-center justify-center p-4">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
            <Sparkles className="h-5 w-5 text-amber-500 opacity-40" />
          </div>
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Church className="h-8 w-8 text-primary" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold">Mass Finder</h1>
          <p className="text-muted-foreground mt-2">Portal da Paróquia</p>
        </div>

        <Card className="border-t-4 border-t-primary/30 shadow-lg">
          <CardHeader>
            <CardTitle>Login da Paróquia</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar o painel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="paroquia@exemplo.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-4">
          <Button variant="link" onClick={() => navigate("/")}>
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}