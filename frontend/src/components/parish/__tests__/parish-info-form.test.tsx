import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { ParishInfoForm } from '../parish-info-form';
import { renderWithProviders } from '@/test/test-utils';
import type { ParishDetail } from '@/types/parish';

const mockParish: ParishDetail = {
  id: 1,
  name: 'Paróquia São José',
  cnpj: '12.345.678/0001-90',
  neighborhood: 'Centro',
  address: 'Rua Principal, 100',
  mass_schedules: [],
};

describe('ParishInfoForm', () => {
  const defaultProps = {
    parish: mockParish,
    isLoading: false,
    isError: false,
    onSave: vi.fn(),
    isSaving: false,
    saveSuccess: false,
    saveError: null,
  };

  it('renderiza os dados da paróquia nos campos', () => {
    renderWithProviders(<ParishInfoForm {...defaultProps} />);

    expect(screen.getByLabelText('CNPJ')).toHaveValue('12.345.678/0001-90');
    expect(screen.getByLabelText('Nome da Paróquia')).toHaveValue(
      'Paróquia São José',
    );
    expect(screen.getByLabelText('Bairro')).toHaveValue('Centro');
    expect(screen.getByLabelText('Endereço')).toHaveValue('Rua Principal, 100');
  });

  it('CNPJ é campo somente leitura', () => {
    renderWithProviders(<ParishInfoForm {...defaultProps} />);

    expect(screen.getByLabelText('CNPJ')).toBeDisabled();
    expect(
      screen.getByText('O CNPJ não pode ser alterado.'),
    ).toBeInTheDocument();
  });

  it('chama onSave com os dados ao submeter o formulário', async () => {
    const onSave = vi.fn();
    const { user } = renderWithProviders(
      <ParishInfoForm {...defaultProps} onSave={onSave} />,
    );

    const nameInput = screen.getByLabelText('Nome da Paróquia');
    await user.clear(nameInput);
    await user.type(nameInput, 'Paróquia Atualizada');

    await user.click(
      screen.getByRole('button', { name: /salvar alterações/i }),
    );

    expect(onSave).toHaveBeenCalledWith({
      name: 'Paróquia Atualizada',
      neighborhood: 'Centro',
      address: 'Rua Principal, 100',
    });
  });

  it('exibe mensagem de sucesso após salvar', () => {
    renderWithProviders(
      <ParishInfoForm {...defaultProps} saveSuccess={true} />,
    );

    expect(
      screen.getByText('Alterações salvas com sucesso.'),
    ).toBeInTheDocument();
  });

  it('exibe mensagem de erro ao falhar ao salvar', () => {
    renderWithProviders(
      <ParishInfoForm
        {...defaultProps}
        saveError={new Error('Server error')}
      />,
    );

    expect(
      screen.getByText('Erro ao salvar alterações. Tente novamente.'),
    ).toBeInTheDocument();
  });

  it('exibe loading ao carregar dados', () => {
    renderWithProviders(
      <ParishInfoForm {...defaultProps} isLoading={true} parish={undefined} />,
    );

    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
  });

  it('exibe erro ao falhar ao carregar dados', () => {
    renderWithProviders(
      <ParishInfoForm {...defaultProps} isError={true} parish={undefined} />,
    );

    expect(
      screen.getByText(
        'Erro ao carregar os dados da paróquia. Tente novamente mais tarde.',
      ),
    ).toBeInTheDocument();
  });
});
