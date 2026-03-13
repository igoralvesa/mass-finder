import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { PendingRequestsTable } from '../pending-requests-table';
import { renderWithProviders } from '@/test/test-utils';
import { mockAdminParishes } from '@/test/fixtures';

describe('PendingRequestsTable', () => {
  const defaultProps = {
    parishes: mockAdminParishes,
    isLoading: false,
    isError: false,
    onApprove: vi.fn(),
    onReject: vi.fn(),
    approvingId: null,
    isRejecting: false,
  };

  it('renderiza a tabela com paróquias pendentes', () => {
    renderWithProviders(<PendingRequestsTable {...defaultProps} />);

    expect(screen.getByText('Solicitações Pendentes')).toBeInTheDocument();
    // Apenas paróquias pendentes aparecem
    expect(screen.getByText('Paróquia Santa Rita')).toBeInTheDocument();
    // Paróquia aprovada não aparece
    expect(screen.queryByText('Paróquia São José')).not.toBeInTheDocument();
  });

  it('exibe botões de aprovar e rejeitar', () => {
    renderWithProviders(<PendingRequestsTable {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /aprovar/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /rejeitar/i }),
    ).toBeInTheDocument();
  });

  it('chama onApprove ao clicar em Aprovar', async () => {
    const onApprove = vi.fn();
    const { user } = renderWithProviders(
      <PendingRequestsTable {...defaultProps} onApprove={onApprove} />,
    );

    await user.click(screen.getByRole('button', { name: /aprovar/i }));

    expect(onApprove).toHaveBeenCalledWith(2); // id da paróquia pendente
  });

  it('abre dialog de rejeição ao clicar em Rejeitar', async () => {
    const { user } = renderWithProviders(
      <PendingRequestsTable {...defaultProps} />,
    );

    await user.click(screen.getByRole('button', { name: /rejeitar/i }));

    expect(screen.getByText('Rejeitar Paróquia')).toBeInTheDocument();
    expect(screen.getByLabelText('Motivo da rejeição')).toBeInTheDocument();
  });

  it('chama onReject com motivo ao confirmar rejeição', async () => {
    const onReject = vi.fn();
    const { user } = renderWithProviders(
      <PendingRequestsTable {...defaultProps} onReject={onReject} />,
    );

    await user.click(screen.getByRole('button', { name: /rejeitar/i }));
    await user.type(
      screen.getByLabelText('Motivo da rejeição'),
      'Documentação incompleta',
    );
    await user.click(
      screen.getByRole('button', { name: /confirmar rejeição/i }),
    );

    expect(onReject).toHaveBeenCalledWith(2, 'Documentação incompleta');
  });

  it('exibe mensagem quando não há solicitações pendentes', () => {
    renderWithProviders(
      <PendingRequestsTable
        {...defaultProps}
        parishes={[mockAdminParishes[0]]} // apenas aprovada
      />,
    );

    expect(
      screen.getByText('Nenhuma solicitação pendente.'),
    ).toBeInTheDocument();
  });

  it('exibe estado de loading', () => {
    renderWithProviders(
      <PendingRequestsTable {...defaultProps} isLoading={true} parishes={[]} />,
    );

    expect(screen.getByText('Carregando solicitações...')).toBeInTheDocument();
  });
});
