import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { RegisterParishForm } from '../register-parish-form';
import { renderWithProviders } from '@/test/test-utils';
import { HttpError } from '@/types/api';

const mutateMock = vi.fn();
let mockError: Error | null = null;
let mockIsPending = false;
let mockIsSuccess = false;

vi.mock('@/hooks', () => ({
  useRegisterParish: () => ({
    mutate: mutateMock,
    isPending: mockIsPending,
    error: mockError,
    isSuccess: mockIsSuccess,
  }),
}));

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('RegisterParishForm', () => {
  beforeEach(() => {
    mutateMock.mockReset();
    mockError = null;
    mockIsPending = false;
    mockIsSuccess = false;
  });

  it('renderiza todos os campos do formulário', () => {
    renderWithProviders(<RegisterParishForm />);

    expect(screen.getByLabelText('Nome da Paróquia')).toBeInTheDocument();
    expect(screen.getByLabelText('CNPJ')).toBeInTheDocument();
    expect(screen.getByLabelText('Bairro')).toBeInTheDocument();
    expect(screen.getByLabelText('Endereço Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail de Contato')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar Senha')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Solicitar Cadastro' }),
    ).toBeInTheDocument();
  });

  it('permite preencher e enviar o formulário', async () => {
    const { user } = renderWithProviders(<RegisterParishForm />);

    await user.type(
      screen.getByLabelText('Nome da Paróquia'),
      'Paróquia Teste',
    );
    await user.type(screen.getByLabelText('CNPJ'), '12.345.678/0001-90');
    await user.type(
      screen.getByLabelText('E-mail de Contato'),
      'test@test.com',
    );
    await user.type(screen.getByLabelText('Senha'), '123456');
    await user.type(screen.getByLabelText('Confirmar Senha'), '123456');
    await user.click(
      screen.getByRole('button', { name: 'Solicitar Cadastro' }),
    );

    expect(mutateMock).toHaveBeenCalledWith({
      name: 'Paróquia Teste',
      cnpj: '12.345.678/0001-90',
      email: 'test@test.com',
      password: '123456',
      password_confirmation: '123456',
      neighborhood: undefined,
      address: undefined,
    });
  });

  it('exibe tela de sucesso após cadastro', () => {
    mockIsSuccess = true;

    renderWithProviders(<RegisterParishForm />);

    expect(screen.getByText('Solicitação Enviada')).toBeInTheDocument();
    expect(
      screen.getByText('Seu cadastro foi recebido com sucesso'),
    ).toBeInTheDocument();
  });

  it('exibe erros de validação por campo', () => {
    const httpError = new HttpError('Erro de validação', 422, {
      name: ['O nome é obrigatório'],
      email: ['O e-mail já está em uso'],
    });
    mockError = httpError;

    renderWithProviders(<RegisterParishForm />);

    expect(screen.getByText('O nome é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('O e-mail já está em uso')).toBeInTheDocument();
  });

  it('exibe mensagem genérica para erro não-HttpError', () => {
    mockError = new Error('Network error');

    renderWithProviders(<RegisterParishForm />);

    expect(
      screen.getByText('Erro ao realizar cadastro. Tente novamente.'),
    ).toBeInTheDocument();
  });

  it('desabilita campos e mostra loading quando isPending', () => {
    mockIsPending = true;

    renderWithProviders(<RegisterParishForm />);

    expect(screen.getByLabelText('Nome da Paróquia')).toBeDisabled();
    expect(screen.getByLabelText('CNPJ')).toBeDisabled();
    expect(screen.getByText('Enviando...')).toBeInTheDocument();
  });
});
