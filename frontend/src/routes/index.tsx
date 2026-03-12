import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PublicHeader } from '@/components/home/public-header';
import { HeroSection } from '@/components/home/hero-section';
import { FilterBar } from '@/components/home/filter-bar';
import type { FilterValues } from '@/components/home/filter-bar';
import { ParishList } from '@/components/home/parish-list';
import { usePublicParishes } from '@/hooks';
import { Loader2, AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [filters, setFilters] = useState<FilterValues>({});

  const { data, isLoading, isError, error } = usePublicParishes({
    neighborhood: filters.neighborhood,
    day_of_week: filters.day_of_week,
  });

  const parishes = data?.data ?? [];

  const neighborhoods = useMemo(() => {
    if (!data?.data) return [];
    const unique = new Set(
      data.data.map((p) => p.neighborhood).filter(Boolean),
    );
    return Array.from(unique).sort();
  }, [data?.data]);

  function handleFilter(values: FilterValues) {
    setFilters(values);
  }

  return (
    <div className='min-h-screen bg-background'>
      <PublicHeader />

      <main className='container mx-auto px-4 py-12'>
        <div className='max-w-5xl mx-auto space-y-8'>
          <HeroSection />
          <FilterBar neighborhoods={neighborhoods} onFilter={handleFilter} />

          {isLoading ? (
            <div className='flex justify-center py-12'>
              <Loader2 className='h-8 w-8 animate-spin text-primary' />
            </div>
          ) : isError ? (
            <div className='text-center py-12 space-y-3'>
              <div className='mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center'>
                <AlertCircle className='h-6 w-6 text-destructive' />
              </div>
              <p className='text-muted-foreground'>
                Erro ao carregar paróquias.{' '}
                {error instanceof Error ? error.message : ''}
              </p>
            </div>
          ) : (
            <ParishList parishes={parishes} />
          )}
        </div>
      </main>
    </div>
  );
}
