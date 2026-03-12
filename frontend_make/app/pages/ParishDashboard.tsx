import { useState } from "react";
import { SidebarLayout } from "../components/SidebarLayout";
import { DashboardHeader } from "../components/DashboardHeader";
import { MassScheduleTable } from "../components/MassScheduleTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Info, Calendar, Plus } from "lucide-react";
// DADOS MOCKADOS - Substituir por chamada de API
import { mockParishes, daysOfWeek } from "../data/mockData";

export function ParishDashboard() {
  const [activeView, setActiveView] = useState("info");
  const [dialogOpen, setDialogOpen] = useState(false);

  // TODO: Substituir dados mockados por API real
  // useEffect(() => {
  //   // Buscar dados da paróquia logada
  //   const token = localStorage.getItem('parishToken');
  //   fetch('/api/parishes/me', {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   })
  //     .then(res => res.json())
  //     .then(data => setParish(data));
  // }, []);

  // DADOS MOCKADOS - Usando primeira paróquia como exemplo
  const parish = mockParishes[0];

  const sidebarItems = [
    { id: "info", label: "Informações da Paróquia", icon: <Info className="h-4 w-4" /> },
    { id: "schedule", label: "Horários de Missas", icon: <Calendar className="h-4 w-4" /> },
  ];

  return (
    <div>
      <DashboardHeader title="Mass Finder" role="parish" />
      <SidebarLayout items={sidebarItems} activeItem={activeView} onItemClick={setActiveView}>
        <div className="p-8 bg-gradient-to-br from-background to-accent/5 min-h-screen">
          {activeView === "info" && (
            <Card>
              <CardHeader>
                <CardTitle>Informações da Paróquia</CardTitle>
                <CardDescription>Gerencie os dados da sua paróquia</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  {/* TODO: Implementar atualização com API
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    fetch('/api/parishes/me', {
                      method: 'PUT',
                      headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('parishToken')}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        name: formData.get('name'),
                        neighborhood: formData.get('neighborhood'),
                        address: formData.get('address'),
                        email: formData.get('email')
                      })
                    }).then(() => alert('Dados atualizados!'));
                  }}
                  */}
                  <div className="space-y-2">
                    <Label htmlFor="parish-name">Nome da Paróquia</Label>
                    <Input id="parish-name" defaultValue={parish.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parish-neighborhood">Bairro</Label>
                    <Input id="parish-neighborhood" defaultValue={parish.neighborhood} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parish-address">Endereço</Label>
                    <Input id="parish-address" defaultValue={parish.address} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parish-email">E-mail de Contato</Label>
                    <Input id="parish-email" type="email" defaultValue={parish.email} />
                  </div>

                  <Button type="submit">Salvar Alterações</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeView === "schedule" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Gerenciar Horários de Missas</CardTitle>
                      <CardDescription>Adicione, edite ou remova horários de missa</CardDescription>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Horário
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Adicionar Horário de Missa</DialogTitle>
                          <DialogDescription>
                            Preencha os dados do novo horário de missa
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          {/* TODO: Implementar criação de horário com API
                          onSubmit={(e) => {
                            fetch('/api/masses', {
                              method: 'POST',
                              headers: {
                                'Authorization': `Bearer ${localStorage.getItem('parishToken')}`,
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({ day, time })
                            }).then(() => setDialogOpen(false));
                          }}
                          */}
                          <div className="space-y-2">
                            <Label htmlFor="mass-day">Dia da Semana</Label>
                            <Select>
                              <SelectTrigger id="mass-day">
                                <SelectValue placeholder="Selecione o dia" />
                              </SelectTrigger>
                              <SelectContent>
                                {daysOfWeek.map((day) => (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="mass-time">Horário</Label>
                            <Input id="mass-time" type="time" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={() => setDialogOpen(false)}>Salvar</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* DADOS MOCKADOS - Substituir por dados da API */}
                  {/* TODO: Implementar onEdit e onDelete com chamadas de API
                  onEdit={(id) => fetch(`/api/masses/${id}`, { method: 'PUT', ... })}
                  onDelete={(id) => fetch(`/api/masses/${id}`, { method: 'DELETE', ... })}
                  */}
                  <MassScheduleTable masses={parish.masses} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
}