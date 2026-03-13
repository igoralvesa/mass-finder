import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ParishesTable } from '../parishes-table';
import { renderWithProviders } from '@/test/test-utils';
import { mockAdminParishes } from '@/test/fixtures';

describe('ParishesTable', () => {
  const defaultProps = {
    parishes: mockAdminParishes,
    isLoading: false,
    isError: false,
    onDelete: vi.fn(),
    deletingId: null,
  };

  it('renderiza a tabela com paróquias aprovadas', () => {
    renderWithProviders(<ParishesTable {...defaultProps} />);

    expect(screen.getByText('Gerenciar Paróquias')).toBeInTheDocument();
    // Apenas paróquias aprovadas aparecem
    expect(screen.getByText('Paróquia São José')).toBeInTheDocument();
    // Paróquia pendente não aparece nesta tabela
    expect(screen.queryByText('Paróquia Santa Rita')).not.toBeInTheDocument();
  });

  it('exibe estado de loading', () => {
    renderWithProviders(
      <ParishesTable {...defaultProps} isLoading={true} parishes={[]} />,
    );

    expect(screen.getByText('Carregando paróquias...')).toBeInTheDocument();
  });

  it('exibe estado de erro', () => {
    renderWithProviders(
      <ParishesTable {...defaultProps} isError={true} parishes={[]} />,
    );

    expect(
      screen.getByText(
        'Erro ao carregar paróquias. Tente novamente mais tarde.',
      ),
    ).toBeInTheDocument();
  });

  it('exibe mensagem quando não há paróquias aprovadas', () => {
    renderWithProviders(<ParishesTable {...defaultProps} parishes={[]} />);

    expect(
      screen.getByText('Nenhuma paróquia aprovada encontrada.'),
    ).toBeInTheDocument();
  });

  it('chama onDelete ao clicar em Remover', async () => {
    const onDelete = vi.fn();
    const { user } = renderWithProviders(
      <ParishesTable {...defaultProps} onDelete={onDelete} />,
    );

    await user.click(screen.getByRole('button', { name: /remover/i }));

    expect(onDelete).toHaveBeenCalledWith(1); // id da paróquia aprovada
  });
});
