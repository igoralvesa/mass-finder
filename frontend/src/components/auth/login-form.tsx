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
import { useLogin } from '@/hooks';
import { HttpError } from '@/types/api';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSuccess: (role: 'parish' | 'admin') => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  const errorMessage =
    loginMutation.error instanceof HttpError
      ? loginMutation.error.message
      : loginMutation.error
        ? 'Erro ao realizar login. Tente novamente.'
        : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          const role = res.data?.user?.role ?? 'parish';
          onSuccess(role);
        },
      },
    );
  }

  return (
    <Card className='border-t-4 border-t-primary/30 shadow-lg'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar o painel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>E-mail</Label>
            <Input
              id='email'
              type='email'
              placeholder='paroquia@exemplo.com'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loginMutation.isPending}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Senha</Label>
            <Input
              id='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginMutation.isPending}
            />
          </div>

          {errorMessage && (
            <p className='text-sm text-destructive'>{errorMessage}</p>
          )}

          <Button
            type='submit'
            className='w-full'
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin' />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
      </CardContent>

      <div className='text-center pb-4'>
        <Link to='/'>
          <Button variant='link'>Voltar para Home</Button>
        </Link>
      </div>
    </Card>
  );
}
