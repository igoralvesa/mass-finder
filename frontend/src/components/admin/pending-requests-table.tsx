import { useState } from 'react';
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
import { Check, X, Loader2 } from 'lucide-react';
import { RejectDialog } from './reject-dialog';
import type { AdminParish } from '@/types/parish';

interface PendingRequestsTableProps {
  parishes: AdminParish[];
  isLoading: boolean;
  isError: boolean;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
  approvingId: number | null;
  isRejecting: boolean;
}

export function PendingRequestsTable({
  parishes,
  isLoading,
  isError,
  onApprove,
  onReject,
  approvingId,
  isRejecting,
}: PendingRequestsTableProps) {
  const [rejectingParish, setRejectingParish] = useState<AdminParish | null>(
    null,
  );

  const pendingParishes = parishes.filter((p) => p.status === 'pending');

  function handleRejectConfirm(reason: string) {
    if (rejectingParish) {
      onReject(rejectingParish.id, reason);
      setRejectingParish(null);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Solicitações Pendentes</CardTitle>
          <CardDescription>
            Paróquias aguardando aprovação ou rejeição.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className='flex items-center justify-center py-12'>
              <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
              <span className='ml-2 text-sm text-muted-foreground'>
                Carregando solicitações...
              </span>
            </div>
          )}

          {isError && (
            <div className='py-12 text-center'>
              <p className='text-sm text-destructive'>
                Erro ao carregar solicitações. Tente novamente mais tarde.
              </p>
            </div>
          )}

          {!isLoading && !isError && pendingParishes.length === 0 && (
            <div className='py-12 text-center'>
              <p className='text-sm text-muted-foreground'>
                Nenhuma solicitação pendente.
              </p>
            </div>
          )}

          {!isLoading && !isError && pendingParishes.length > 0 && (
            <div className='border rounded-lg'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da Paróquia</TableHead>
                    <TableHead>Bairro</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead className='text-right'>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingParishes.map((parish) => (
                    <TableRow key={parish.id}>
                      <TableCell className='font-medium'>
                        {parish.name}
                      </TableCell>
                      <TableCell>{parish.neighborhood || '—'}</TableCell>
                      <TableCell>{parish.address || '—'}</TableCell>
                      <TableCell>{parish.cnpj}</TableCell>
                      <TableCell>
                        <div className='flex justify-end gap-2'>
                          <Button
                            size='sm'
                            className='bg-green-600 hover:bg-green-700'
                            onClick={() => onApprove(parish.id)}
                            disabled={approvingId === parish.id}
                          >
                            {approvingId === parish.id ? (
                              <Loader2 className='h-4 w-4 animate-spin' />
                            ) : (
                              <Check className='h-4 w-4' />
                            )}
                            Aprovar
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => setRejectingParish(parish)}
                            disabled={isRejecting}
                          >
                            <X className='h-4 w-4' />
                            Rejeitar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {rejectingParish && (
        <RejectDialog
          parishName={rejectingParish.name}
          onConfirm={handleRejectConfirm}
          onCancel={() => setRejectingParish(null)}
          isPending={isRejecting}
        />
      )}
    </>
  );
}
