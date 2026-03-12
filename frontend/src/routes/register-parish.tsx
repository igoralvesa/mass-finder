import { createFileRoute } from '@tanstack/react-router';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { RegisterParishForm } from '@/components/auth/register-parish-form';
import { Church, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/register-parish')({
  component: RegisterParishPage,
});

function RegisterParishPage() {
  return (
    <div className='min-h-screen bg-linear-to-br from-background via-secondary/10 to-background p-4'>
      <div className='fixed top-4 right-4'>
        <ThemeToggle />
      </div>
      <div className='w-full max-w-2xl mx-auto py-8'>
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
          <p className='text-muted-foreground mt-2'>
            Cadastro de Nova Paróquia
          </p>
        </div>

        <RegisterParishForm />
      </div>
    </div>
  );
}
