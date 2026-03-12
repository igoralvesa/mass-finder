import { useState } from 'react';
import { SidebarLayout } from '../components/SidebarLayout';
import { DashboardHeader } from '../components/DashboardHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, FileText, Eye, Ban, Check, X } from 'lucide-react';
// DADOS MOCKADOS - Substituir por chamada de API
import { mockParishes, mockPendingRequests } from '../data/mockData';

export function AdminDashboard() {
  const [activeView, setActiveView] = useState('parishes');

  // TODO: Substituir dados mockados por API real
  // useEffect(() => {
  //   const token = localStorage.getItem('adminToken');
  //
  //   // Buscar paróquias aprovadas
  //   fetch('/api/admin/parishes', {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   }).then(res => res.json()).then(data => setParishes(data));
  //
  //   // Buscar solicitações pendentes
  //   fetch('/api/admin/requests', {
  //     headers: { 'Authorization': `Bearer ${token}` }
  //   }).then(res => res.json()).then(data => setRequests(data));
  // }, []);

  const sidebarItems = [
    { id: 'parishes', label: 'Gerenciar Paróquias', icon: Users },
    { id: 'requests', label: 'Solicitações Pendentes', icon: FileText },
  ];

  return (
    <div>
      <DashboardHeader title='Mass Finder' role='admin' />
      <SidebarLayout
        items={sidebarItems}
        activeItem={activeView}
        onItemClick={setActiveView}
      >
        <div className='p-8 bg-gradient-to-br from-background to-secondary/5 min-h-screen'>
          {activeView === 'parishes' && (
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Paróquias</CardTitle>
                <CardDescription>
                  Visualize e gerencie todas as paróquias cadastradas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='border rounded-lg'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome da Paróquia</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className='text-right'>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* DADOS MOCKADOS - Substituir por dados da API */}
                      {mockParishes.map((parish) => (
                        <TableRow key={parish.id}>
                          <TableCell className='font-medium'>
                            {parish.name}
                          </TableCell>
                          <TableCell>{parish.neighborhood}</TableCell>
                          <TableCell>
                            <Badge variant='default'>
                              {parish.status === 'active' ? 'Ativa' : 'Inativa'}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-right'>
                            <div className='flex justify-end gap-2'>
                              {/* TODO: Implementar visualização de paróquia
                              onClick={() => navigate(`/admin/parishes/${parish.id}`)}
                              */}
                              <Button variant='ghost' size='sm'>
                                <Eye className='mr-2 h-4 w-4' />
                                Visualizar
                              </Button>
                              {/* TODO: Implementar desativação com API
                              onClick={() => {
                                fetch(`/api/admin/parishes/${parish.id}/disable`, {
                                  method: 'PUT',
                                  headers: { 'Authorization': `Bearer ${token}` }
                                }).then(() => alert('Paróquia desativada'));
                              }}
                              */}
                              <Button variant='ghost' size='sm'>
                                <Ban className='mr-2 h-4 w-4 text-destructive' />
                                Desativar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeView === 'requests' && (
            <Card>
              <CardHeader>
                <CardTitle>Solicitações Pendentes</CardTitle>
                <CardDescription>
                  Aprove ou rejeite solicitações de cadastro de novas paróquias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='border rounded-lg'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome da Paróquia</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead>Endereço</TableHead>
                        <TableHead>Data da Solicitação</TableHead>
                        <TableHead className='text-right'>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* DADOS MOCKADOS - Substituir por dados da API */}
                      {mockPendingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className='font-medium'>
                            {request.name}
                          </TableCell>
                          <TableCell>{request.neighborhood}</TableCell>
                          <TableCell>{request.address}</TableCell>
                          <TableCell>
                            {new Date(request.requestDate).toLocaleDateString(
                              'pt-BR',
                            )}
                          </TableCell>
                          <TableCell className='text-right'>
                            <div className='flex justify-end gap-2'>
                              {/* TODO: Implementar aprovação com API
                              onClick={() => {
                                fetch(`/api/admin/requests/${request.id}/approve`, {
                                  method: 'POST',
                                  headers: { 'Authorization': `Bearer ${token}` }
                                }).then(() => alert('Paróquia aprovada!'));
                              }}
                              */}
                              <Button
                                variant='default'
                                size='sm'
                                className='bg-green-600 hover:bg-green-700'
                              >
                                <Check className='mr-2 h-4 w-4' />
                                Aprovar
                              </Button>
                              {/* TODO: Implementar rejeição com API
                              onClick={() => {
                                fetch(`/api/admin/requests/${request.id}/reject`, {
                                  method: 'POST',
                                  headers: { 'Authorization': `Bearer ${token}` }
                                }).then(() => alert('Solicitação rejeitada'));
                              }}
                              */}
                              <Button variant='destructive' size='sm'>
                                <X className='mr-2 h-4 w-4' />
                                Rejeitar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
}
