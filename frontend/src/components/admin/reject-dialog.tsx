import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RejectDialogProps {
  parishName: string;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  isPending: boolean;
}

export function RejectDialog({
  parishName,
  onConfirm,
  onCancel,
  isPending,
}: RejectDialogProps) {
  const [reason, setReason] = useState('');

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black/50' onClick={onCancel} />
      <div className='relative z-50 w-full max-w-md rounded-xl border bg-card p-6 shadow-lg'>
        <h3 className='text-base font-medium'>Rejeitar Paróquia</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          Informe o motivo da rejeição de <strong>{parishName}</strong>.
        </p>
        <div className='mt-4 space-y-2'>
          <Label htmlFor='rejection-reason'>Motivo da rejeição</Label>
          <Input
            id='rejection-reason'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder='Descreva o motivo...'
          />
        </div>
        <div className='mt-6 flex justify-end gap-2'>
          <Button variant='outline' onClick={onCancel} disabled={isPending}>
            Cancelar
          </Button>
          <Button
            variant='destructive'
            onClick={() => onConfirm(reason)}
            disabled={!reason.trim() || isPending}
          >
            {isPending ? 'Rejeitando...' : 'Confirmar Rejeição'}
          </Button>
        </div>
      </div>
    </div>
  );
}
