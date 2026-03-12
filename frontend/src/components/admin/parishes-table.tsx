import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Trash2, Loader2 } from 'lucide-react';
import type { AdminParish, ParishStatus } from '@/types/parish';

const statusConfig: Record<
  ParishStatus,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }
> = {
  approved: { label: 'Aprovada', variant: 'default' },
  pending: { label: 'Pendente', variant: 'outline' },
  rejected: { label: 'Rejeitada', variant: 'destructive' },
};

interface ParishesTableProps {
  parishes: AdminParish[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: number) => void;
  deletingId: number | null;
}

export function ParishesTable({
  parishes,
  isLoading,
  isError,
  onDelete,
  deletingId,
}: ParishesTableProps) {
  const approvedParishes = parishes.filter((p) => p.status === 'approved');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Paróquias</CardTitle>
        <CardDescription>
          Paróquias cadastradas e aprovadas no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
            <span className='ml-2 text-sm text-muted-foreground'>
              Carregando paróquias...
            </span>
          </div>
        )}

        {isError && (
          <div className='py-12 text-center'>
            <p className='text-sm text-destructive'>
              Erro ao carregar paróquias. Tente novamente mais tarde.
            </p>
          </div>
        )}

        {!isLoading && !isError && approvedParishes.length === 0 && (
          <div className='py-12 text-center'>
            <p className='text-sm text-muted-foreground'>
              Nenhuma paróquia aprovada encontrada.
            </p>
          </div>
        )}

        {!isLoading && !isError && approvedParishes.length > 0 && (
          <div className='border rounded-lg'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Paróquia</TableHead>
                  <TableHead>Bairro</TableHead>
                  <TableHead>Endereço</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedParishes.map((parish) => {
                  const status = statusConfig[parish.status];
                  return (
                    <TableRow key={parish.id}>
                      <TableCell className='font-medium'>
                        {parish.name}
                      </TableCell>
                      <TableCell>{parish.neighborhood || '—'}</TableCell>
                      <TableCell>{parish.address || '—'}</TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex justify-end gap-2'>
                          {/* <Button variant='ghost' size='sm' disabled>
                            <Eye className='h-4 w-4' />
                            Visualizar
                          </Button> */}
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => onDelete(parish.id)}
                            disabled={deletingId === parish.id}
                          >
                            {deletingId === parish.id ? (
                              <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                              <Trash2 className='h-4 w-4 text-destructive' />
                            )}
                            Remover
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
