import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/common/theme-toggle';
import { Church } from 'lucide-react';

export function PublicHeader() {
  return (
    <header className='border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link to='/' className='flex items-center gap-2 no-underline'>
            <div className='p-2 rounded-lg bg-primary/10'>
              <Church className='h-6 w-6 text-primary' />
            </div>
            <span className='text-2xl font-bold bg-linear-to-r from-primary to-purple-700 bg-clip-text text-transparent'>
              Mass Finder
            </span>
          </Link>

          <nav className='hidden sm:flex items-center gap-4'>
            {/* <Link to='/'>
              <Button variant='ghost'>Home</Button>
            </Link> */}
            <Link to='/register-parish'>
              <Button variant='ghost'>Cadastrar Paróquia</Button>
            </Link>
            <Link to='/login'>
              <Button variant='default' className='shadow-sm'>
                Login
              </Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
