import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { FilterBar } from '../filter-bar';
import { renderWithProviders } from '@/test/test-utils';

describe('FilterBar', () => {
  const neighborhoods = ['Centro', 'Boa Viagem', 'Derby'];

  it('renderiza os campos de filtro', () => {
    renderWithProviders(
      <FilterBar neighborhoods={neighborhoods} onFilter={vi.fn()} />,
    );

    expect(screen.getByText('Bairro')).toBeInTheDocument();
    expect(screen.getByText('Dia da Semana')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('chama onFilter ao clicar em Buscar', async () => {
    const onFilter = vi.fn();
    const { user } = renderWithProviders(
      <FilterBar neighborhoods={neighborhoods} onFilter={onFilter} />,
    );

    await user.click(screen.getByRole('button', { name: /buscar/i }));

    expect(onFilter).toHaveBeenCalledWith({
      neighborhood: undefined,
      day_of_week: undefined,
    });
  });

  it('exibe botão Limpar apenas quando há filtros selecionados', async () => {
    renderWithProviders(
      <FilterBar neighborhoods={neighborhoods} onFilter={vi.fn()} />,
    );

    expect(
      screen.queryByRole('button', { name: /limpar/i }),
    ).not.toBeInTheDocument();
  });
});
