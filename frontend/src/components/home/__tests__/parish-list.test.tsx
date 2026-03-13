import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ParishList } from '../parish-list';
import { renderWithProviders } from '@/test/test-utils';
import { mockParishes } from '@/test/fixtures';

describe('ParishList', () => {
  it('renderiza a lista de paróquias quando recebe dados', () => {
    renderWithProviders(<ParishList parishes={mockParishes} />);

    expect(screen.getByText('Paróquias Disponíveis')).toBeInTheDocument();
    expect(screen.getByText('Paróquia São José')).toBeInTheDocument();
    expect(screen.getByText('Paróquia Nossa Senhora')).toBeInTheDocument();
  });

  it('exibe estado vazio quando não há paróquias', () => {
    renderWithProviders(<ParishList parishes={[]} />);

    expect(
      screen.getByText('Nenhuma paróquia encontrada.'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Paróquias Disponíveis')).not.toBeInTheDocument();
  });

  it('exibe bairro e endereço de cada paróquia', () => {
    renderWithProviders(<ParishList parishes={mockParishes} />);

    expect(screen.getByText('Rua Principal, 100')).toBeInTheDocument();
    expect(screen.getByText('Av. Conselheiro Aguiar, 200')).toBeInTheDocument();
  });

  it('exibe os horários de missa formatados', () => {
    renderWithProviders(<ParishList parishes={mockParishes} />);

    expect(screen.getByText('Domingo - 08:00:00')).toBeInTheDocument();
    expect(screen.getByText('Quarta-feira - 19:00:00')).toBeInTheDocument();
    expect(screen.getByText('Sábado - 17:00:00')).toBeInTheDocument();
  });
});
