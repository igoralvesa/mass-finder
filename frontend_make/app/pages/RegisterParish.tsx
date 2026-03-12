import { useNavigate, Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";
import { Church, Sparkles } from "lucide-react";

export function RegisterParish() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar cadastro real com API
    // const formData = new FormData(e.target);
    // fetch('/api/parishes/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: formData.get('name'),
    //     neighborhood: formData.get('neighborhood'),
    //     address: formData.get('address'),
    //     email: formData.get('email'),
    //     password: formData.get('password')
    //   })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     alert('Solicitação enviada! Aguarde aprovação do administrador.');
    //     navigate('/');
    //   })
    //   .catch(err => console.error('Erro ao cadastrar:', err));
    
    // MOCK - Apenas simula o cadastro
    alert("Solicitação de cadastro enviada! Aguarde aprovação do administrador.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-4">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="container max-w-2xl mx-auto py-8">
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
          <p className="text-muted-foreground mt-2">Cadastro de Nova Paróquia</p>
        </div>

        <Card className="border-t-4 border-t-amber-500/30 shadow-lg">
          <CardHeader>
            <CardTitle>Cadastro de Paróquia</CardTitle>
            <CardDescription>
              Preencha os dados da sua paróquia para solicitar o cadastro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Paróquia</Label>
                <Input id="name" placeholder="Ex: Paróquia São José" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" placeholder="Ex: Centro" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo</Label>
                <Input id="address" placeholder="Ex: Rua das Flores, 123" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail de Contato</Label>
                <Input id="email" type="email" placeholder="contato@paroquia.com.br" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => navigate("/")} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Solicitar Cadastro
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}