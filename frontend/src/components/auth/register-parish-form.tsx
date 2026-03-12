import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRegisterParish } from '@/hooks';
import { HttpError } from '@/types/api';
import { Loader2 } from 'lucide-react';

export function RegisterParishForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const registerMutation = useRegisterParish();

  const errorMessage =
    registerMutation.error instanceof HttpError
      ? registerMutation.error.message
      : registerMutation.error
        ? 'Erro ao realizar cadastro. Tente novamente.'
        : null;

  const fieldErrors =
    registerMutation.error instanceof HttpError
      ? registerMutation.error.errors
      : undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    registerMutation.mutate({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      cnpj,
      neighborhood: neighborhood || undefined,
      address: address || undefined,
    });
  }

  if (registerMutation.isSuccess) {
    return (
      <Card className='border-t-4 border-t-green-500/30 shadow-lg'>
        <CardHeader>
          <CardTitle>Solicitação Enviada</CardTitle>
          <CardDescription>
            Seu cadastro foi recebido com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            Sua paróquia foi cadastrada e está aguardando aprovação do
            administrador. Você receberá acesso assim que o cadastro for
            aprovado.
          </p>
          <Link to='/'>
            <Button variant='outline' className='w-full'>
              Voltar para Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border-t-4 border-t-amber-500/30 shadow-lg'>
      <CardHeader>
        <CardTitle>Cadastro de Paróquia</CardTitle>
        <CardDescription>
          Preencha os dados para solicitar o cadastro da sua paróquia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Nome da Paróquia</Label>
            <Input
              id='name'
              type='text'
              placeholder='Ex: Paróquia São José'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={registerMutation.isPending}
            />
            {fieldErrors?.name && (
              <p className='text-xs text-destructive'>{fieldErrors.name[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='cnpj'>CNPJ</Label>
            <Input
              id='cnpj'
              type='text'
              placeholder='00.000.000/0000-00'
              required
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              disabled={registerMutation.isPending}
            />
            {fieldErrors?.cnpj && (
              <p className='text-xs text-destructive'>{fieldErrors.cnpj[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='neighborhood'>Bairro</Label>
            <Input
              id='neighborhood'
              type='text'
              placeholder='Ex: Centro'
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              disabled={registerMutation.isPending}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address'>Endereço Completo</Label>
            <Input
              id='address'
              type='text'
              placeholder='Ex: Rua Principal, 100'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={registerMutation.isPending}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='register-email'>E-mail de Contato</Label>
            <Input
              id='register-email'
              type='email'
              placeholder='paroquia@exemplo.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={registerMutation.isPending}
            />
            {fieldErrors?.email && (
              <p className='text-xs text-destructive'>{fieldErrors.email[0]}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='register-password'>Senha</Label>
            <Input
              id='register-password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={registerMutation.isPending}
            />
            {fieldErrors?.password && (
              <p className='text-xs text-destructive'>
                {fieldErrors.password[0]}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password-confirmation'>Confirmar Senha</Label>
            <Input
              id='password-confirmation'
              type='password'
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              disabled={registerMutation.isPending}
            />
          </div>

          {errorMessage && (
            <p className='text-sm text-destructive'>{errorMessage}</p>
          )}

          <div className='flex gap-4'>
            <Link to='/' className='flex-1'>
              <Button
                type='button'
                variant='outline'
                className='w-full'
                disabled={registerMutation.isPending}
              >
                Cancelar
              </Button>
            </Link>
            <Button
              type='submit'
              className='flex-1'
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Enviando...
                </>
              ) : (
                'Solicitar Cadastro'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
