import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarLayoutProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  children: React.ReactNode;
}

export function SidebarLayout({
  items,
  activeItem,
  onItemClick,
  children,
}: SidebarLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleItemClick(id: string) {
    onItemClick(id);
    setMobileOpen(false);
  }

  return (
    <div className='flex min-h-[calc(100vh-73px)]'>
      {/* Mobile toggle */}
      <div className='fixed bottom-4 right-4 z-30 md:hidden'>
        <Button
          size='icon'
          className='h-12 w-12 rounded-full shadow-lg'
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className='h-5 w-5' />
          ) : (
            <Menu className='h-5 w-5' />
          )}
        </Button>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className='fixed inset-0 z-20 bg-black/40 md:hidden'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-[73px] left-0 z-20 h-[calc(100vh-73px)] w-64 border-r bg-card/95 backdrop-blur-sm transition-transform md:static md:translate-x-0 md:bg-card/30 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className='p-4 space-y-2'>
          {items.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-2 ${
                  isActive ? 'bg-primary shadow-sm' : 'hover:bg-accent/50'
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <Icon className='h-4 w-4' />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>

      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  );
}
