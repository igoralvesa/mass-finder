import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { LoginForm } from '@/components/auth/login-form';
import { Church, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  function handleLoginSuccess(role: 'parish' | 'admin') {
    if (role === 'admin') {
      navigate({ to: '/dashboard-admin' });
    } else {
      navigate({ to: '/dashboard-parish' });
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-background via-accent/5 to-background flex items-center justify-center p-4'>
      <div className='fixed top-4 right-4'>
        <ThemeToggle />
      </div>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8 relative'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6'>
            <Sparkles className='h-5 w-5 text-amber-500 opacity-40' />
          </div>
          <Link
            to='/'
            className='inline-flex items-center gap-2 mb-4 no-underline'
          >
            <div className='p-3 rounded-full bg-primary/10'>
              <Church className='h-8 w-8 text-primary' />
            </div>
          </Link>
          <h1 className='text-3xl font-bold'>Mass Finder</h1>
          <p className='text-muted-foreground mt-2'>Portal de Acesso</p>
        </div>

        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
