import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useLogout } from '@/hooks';
import { Church, LogOut, Loader2 } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  role?: 'parish' | 'admin';
}

export function DashboardHeader({
  title,
  role = 'parish',
}: DashboardHeaderProps) {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate({ to: '/' });
      },
    });
  }

  return (
    <header className='border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10'>
      <div className='container mx-auto px-6 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 rounded-lg bg-primary/10'>
              <Church className='h-6 w-6 text-primary' />
            </div>
            <div>
              <h1 className='text-2xl font-bold'>{title}</h1>
              <p className='text-xs text-muted-foreground'>
                {role === 'admin'
                  ? 'Painel Administrativo'
                  : 'Gerenciamento de Paróquia'}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <ThemeToggle />
            <Button
              variant='outline'
              onClick={handleLogout}
              className='gap-2'
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className='h-4 w-4 animate-spin' />
              ) : (
                <LogOut className='h-4 w-4' />
              )}
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
