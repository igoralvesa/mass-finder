import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import { LoginForm } from '../login-form';
import { renderWithProviders } from '@/test/test-utils';
import { HttpError } from '@/types/api';

const mutateMock = vi.fn();
let mockError: Error | null = null;
let mockIsPending = false;

vi.mock('@/hooks', () => ({
  useLogin: () => ({
    mutate: mutateMock,
    isPending: mockIsPending,
    error: mockError,
  }),
}));

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    mutateMock.mockReset();
    mockError = null;
    mockIsPending = false;
  });

  it('renderiza o formulário com campos de email e senha', () => {
    renderWithProviders(<LoginForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('permite preencher e submeter o formulário', async () => {
    const onSuccess = vi.fn();
    const { user } = renderWithProviders(<LoginForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText('E-mail'), 'test@test.com');
    await user.type(screen.getByLabelText('Senha'), '123456');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(mutateMock).toHaveBeenCalledWith(
      { email: 'test@test.com', password: '123456' },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });

  it('exibe mensagem de erro quando há HttpError', () => {
    mockError = new HttpError('Credenciais inválidas', 401);

    renderWithProviders(<LoginForm onSuccess={vi.fn()} />);

    expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
  });

  it('exibe mensagem genérica quando há erro não-HttpError', () => {
    mockError = new Error('Network error');

    renderWithProviders(<LoginForm onSuccess={vi.fn()} />);

    expect(
      screen.getByText('Erro ao realizar login. Tente novamente.'),
    ).toBeInTheDocument();
  });

  it('desabilita campos e mostra loading quando isPending', () => {
    mockIsPending = true;

    renderWithProviders(<LoginForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText('E-mail')).toBeDisabled();
    expect(screen.getByLabelText('Senha')).toBeDisabled();
    expect(screen.getByText('Entrando...')).toBeInTheDocument();
  });
});
