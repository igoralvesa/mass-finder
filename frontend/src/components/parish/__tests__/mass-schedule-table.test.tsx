import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { MassScheduleTable } from '../mass-schedule-table';
import { renderWithProviders } from '@/test/test-utils';
import { mockMassSchedules } from '@/test/fixtures';

describe('MassScheduleTable', () => {
  const defaultProps = {
    schedules: mockMassSchedules,
    isLoading: false,
    isError: false,
    onCreate: vi.fn(),
    onUpdate: vi.fn(),
    onDelete: vi.fn(),
    isCreating: false,
    isUpdating: false,
    isDeleting: false,
    deletingId: null,
  };

  it('renderiza a tabela com horários de missa', () => {
    renderWithProviders(<MassScheduleTable {...defaultProps} />);

    expect(
      screen.getByText('Gerenciar Horários de Missas'),
    ).toBeInTheDocument();
    expect(screen.getByText('Domingo')).toBeInTheDocument();
    expect(screen.getByText('08:00')).toBeInTheDocument();
    expect(screen.getByText('Quarta-feira')).toBeInTheDocument();
    expect(screen.getByText('19:00')).toBeInTheDocument();
  });

  it('exibe observações quando existem', () => {
    renderWithProviders(<MassScheduleTable {...defaultProps} />);

    expect(screen.getByText('Missa solene')).toBeInTheDocument();
  });

  it('exibe botão de adicionar horário', () => {
    renderWithProviders(<MassScheduleTable {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /adicionar horário/i }),
    ).toBeInTheDocument();
  });

  it('exibe mensagem quando não há horários', () => {
    renderWithProviders(<MassScheduleTable {...defaultProps} schedules={[]} />);

    expect(
      screen.getByText('Nenhum horário de missa cadastrado.'),
    ).toBeInTheDocument();
  });

  it('exibe estado de loading', () => {
    renderWithProviders(
      <MassScheduleTable {...defaultProps} isLoading={true} schedules={[]} />,
    );

    expect(screen.getByText('Carregando horários...')).toBeInTheDocument();
  });

  it('exibe estado de erro', () => {
    renderWithProviders(
      <MassScheduleTable {...defaultProps} isError={true} schedules={[]} />,
    );

    expect(
      screen.getByText(
        'Erro ao carregar horários. Tente novamente mais tarde.',
      ),
    ).toBeInTheDocument();
  });

  it('chama onDelete ao clicar no botão de remover', async () => {
    const onDelete = vi.fn();
    const { user, container } = renderWithProviders(
      <MassScheduleTable {...defaultProps} onDelete={onDelete} />,
    );

    // Encontra botões que contêm o ícone Trash2 (lucide-trash-2)
    const deleteButtons = container.querySelectorAll('.lucide-trash-2');
    expect(deleteButtons.length).toBeGreaterThan(0);

    // Clica no botão pai do primeiro ícone de delete
    const deleteButton = deleteButtons[0].closest('button')!;
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockMassSchedules[0].id);
  });
});
