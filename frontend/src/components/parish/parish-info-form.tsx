import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save, CheckCircle } from 'lucide-react';
import type { ParishDetail } from '@/types/parish';
import type { UpdateParishProfileRequest } from '@/types/auth';

interface ParishInfoFormProps {
  parish: ParishDetail | undefined;
  isLoading: boolean;
  isError: boolean;
  onSave: (data: UpdateParishProfileRequest) => void;
  isSaving: boolean;
  saveSuccess: boolean;
  saveError: Error | null;
}

export function ParishInfoForm({
  parish,
  isLoading,
  isError,
  onSave,
  isSaving,
  saveSuccess,
  saveError,
}: ParishInfoFormProps) {
  const [name, setName] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (parish) {
      setName(parish.name);
      setNeighborhood(parish.neighborhood ?? '');
      setAddress(parish.address ?? '');
    }
  }, [parish]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name,
      neighborhood: neighborhood || undefined,
      address: address || undefined,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Paróquia</CardTitle>
        <CardDescription>
          Visualize e edite os dados cadastrais da sua paróquia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className='flex items-center justify-center py-12'>
            <Loader2 className='h-6 w-6 animate-spin text-muted-foreground' />
            <span className='ml-2 text-sm text-muted-foreground'>
              Carregando dados...
            </span>
          </div>
        )}

        {isError && (
          <div className='py-12 text-center'>
            <p className='text-sm text-destructive'>
              Erro ao carregar os dados da paróquia. Tente novamente mais tarde.
            </p>
          </div>
        )}

        {!isLoading && !isError && parish && (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='cnpj'>CNPJ</Label>
              <Input
                id='cnpj'
                value={parish.cnpj}
                disabled
                className='bg-muted/50'
              />
              <p className='text-xs text-muted-foreground'>
                O CNPJ não pode ser alterado.
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='name'>Nome da Paróquia</Label>
              <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nome da paróquia'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='neighborhood'>Bairro</Label>
              <Input
                id='neighborhood'
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder='Bairro'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='address'>Endereço</Label>
              <Input
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder='Endereço completo'
              />
            </div>

            {saveError && (
              <p className='text-sm text-destructive'>
                Erro ao salvar alterações. Tente novamente.
              </p>
            )}

            {saveSuccess && (
              <p className='flex items-center gap-1 text-sm text-green-600'>
                <CheckCircle className='h-4 w-4' />
                Alterações salvas com sucesso.
              </p>
            )}

            <Button type='submit' disabled={isSaving} className='gap-2'>
              {isSaving ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <Save className='h-4 w-4' />
              )}
              Salvar Alterações
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
