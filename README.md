# Mass Finder

Sistema web para cadastro e consulta de horários de missas de paróquias.

---

## Descrição

O **Mass Finder** é uma plataforma que conecta fiéis a paróquias, permitindo a consulta pública de horários de missas. Paróquias podem se cadastrar e gerenciar seus dados e horários, enquanto administradores aprovam e gerenciam as paróquias registradas.

O sistema é dividido em três áreas:

- **Área pública** — qualquer pessoa pode consultar horários de missas por paróquia.
- **Área da paróquia** — a paróquia gerencia seus dados cadastrais e horários de missas.
- **Área do administrador** — o administrador aprova novas paróquias e gerencia o sistema.

---

## Funcionalidades

- Consulta pública de horários de missa
- Cadastro de paróquias
- Autenticação de paróquias e administrador
- Dashboard da paróquia (gerenciamento de dados e horários)
- Dashboard do administrador (aprovação e gerenciamento de paróquias)
- Documentação da API via Swagger

---

## Tecnologias utilizadas

### Frontend

- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [TailwindCSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)

### Backend

- [Laravel](https://laravel.com/) 12 (PHP 8.4)
- [Laravel Sanctum](https://laravel.com/docs/sanctum) (autenticação)
- [L5-Swagger](https://github.com/DarkaOnLine/L5-Swagger) (documentação da API)

### Banco de dados

- [PostgreSQL](https://www.postgresql.org/) 16

### Infraestrutura

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Testes

- **Frontend:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)
- **Backend:** [PHPUnit](https://phpunit.de/)

---

## Arquitetura do projeto

```
mass-finder/
├── backend/          # API REST (Laravel)
│   ├── app/          # Lógica da aplicação (Models, Controllers, etc.)
│   ├── config/       # Configurações do Laravel
│   ├── database/     # Migrations e seeders
│   ├── docker/       # Entrypoint do container backend
│   ├── routes/       # Definição das rotas da API
│   ├── tests/        # Testes do backend (PHPUnit)
│   └── Dockerfile
├── frontend/         # Interface web (React)
│   ├── src/
│   │   ├── api/          # Chamadas à API
│   │   ├── components/   # Componentes React
│   │   ├── hooks/        # Custom hooks
│   │   ├── routes/       # Rotas (TanStack Router)
│   │   ├── test/         # Testes do frontend (Vitest)
│   │   ├── types/        # Tipagens TypeScript
│   │   └── utils/        # Utilitários
│   └── Dockerfile
├── docker/           # Scripts de inicialização do banco
├── docs/             # Documentação complementar
├── docker-compose.yml
├── .env              # Variáveis de ambiente (Docker Compose)
└── README.md
```

- **`backend/`** — API REST construída com Laravel. Responsável por autenticação, regras de negócio e comunicação com o banco de dados.
- **`frontend/`** — Interface web em React. Consome a API do backend para exibir dados e gerenciar as áreas do sistema.
- **`docker/`** — Scripts auxiliares usados na inicialização dos containers (ex.: criação do banco de testes).
- **`docker-compose.yml`** — Orquestra os três serviços: banco de dados, backend e frontend.

---

## Como rodar o projeto localmente

> Esta é a parte mais importante do README. Siga os passos abaixo para ter o projeto rodando na sua máquina.

### Pré-requisitos

Certifique-se de ter instalado:

- [Docker](https://www.docker.com/get-started) (versão 20+)
- [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)
- [Git](https://git-scm.com/)

> **Nota:** Não é necessário instalar PHP, Node.js, Bun ou PostgreSQL localmente. Tudo roda dentro dos containers Docker.

### Passo a passo

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/mass-finder.git
cd mass-finder
```

#### 2. Configure as variáveis de ambiente

O projeto precisa de três arquivos `.env`:

**a) `.env` na raiz do projeto** (usado pelo Docker Compose):

Crie o arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=mass_finder
DB_USERNAME=postgres
DB_PASSWORD=postgres

POSTGRES_DB=mass_finder
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

**b) `.env` no backend:**

```bash
cp backend/.env.example backend/.env
```

As configurações padrão do `.env.example` do backend já estão prontas para uso com Docker. A variável `APP_KEY` será gerada automaticamente na primeira execução.

**c) `.env` no frontend:**

```bash
cp frontend/.env.example frontend/.env
```

O conteúdo deve ser:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

#### 3. Suba todos os serviços com Docker Compose

```bash
docker compose up -d --build
```

O que esse comando faz:

- `docker compose up` — inicia os serviços definidos no `docker-compose.yml`
- `-d` — roda em segundo plano (detached mode)
- `--build` — reconstrói as imagens dos containers (necessário na primeira vez ou após mudanças nos Dockerfiles)

Serão criados três containers:

| Container       | Serviço    | Porta  | Descrição      |
| --------------- | ---------- | ------ | -------------- |
| `mass_db`       | PostgreSQL | `5432` | Banco de dados |
| `mass_backend`  | Laravel    | `8000` | API REST       |
| `mass_frontend` | React/Vite | `5173` | Interface web  |

Na primeira execução, o backend automaticamente:

- Aguarda o banco de dados ficar pronto
- Roda as **migrations** (cria as tabelas)
- Roda os **seeders** (popula dados iniciais, incluindo o usuário admin)
- Gera a **documentação Swagger**

#### 4. Verifique se os containers estão rodando

```bash
docker compose ps
```

Todos os serviços devem aparecer com status `Up`.

#### 5. Acesse a aplicação

- **Frontend (aplicação web):** [http://localhost:5173](http://localhost:5173)
- **API (backend):** [http://localhost:8000/api](http://localhost:8000/api)
- **Swagger (documentação da API):** [http://localhost:8000/api/documentation](http://localhost:8000/api/documentation)

#### 6. Credenciais padrão do administrador

Após os seeders rodarem, o usuário admin estará disponível:

- **Email:** `admin@massfinder.local`
- **Senha:** `password123`

> Essas credenciais podem ser alteradas no arquivo `backend/.env` (variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD`).

### Comandos úteis

```bash
# Ver logs de todos os serviços
docker compose logs -f

# Ver logs de um serviço específico
docker compose logs -f backend

# Parar todos os serviços
docker compose down

# Parar e remover os volumes (apaga dados do banco)
docker compose down -v

# Reconstruir e reiniciar
docker compose up -d --build
```

---

## Rodando os testes

### Testes do frontend

Para rodar os testes do frontend, execute dentro do container:

```bash
docker compose exec frontend bun run test
```

Ou, se preferir rodar em modo watch:

```bash
docker compose exec frontend bun run test:watch
```

### Testes do backend

Para rodar os testes do backend:

```bash
docker compose exec backend php artisan test
```

> O script de inicialização do Docker já cria automaticamente o banco de dados de testes (`mass_finder_test`).

---

## Variáveis de ambiente

### Raiz do projeto (`.env`)

| Variável            | Descrição                                       | Valor padrão  |
| ------------------- | ----------------------------------------------- | ------------- |
| `DB_CONNECTION`     | Driver do banco                                 | `pgsql`       |
| `DB_HOST`           | Host do banco (nome do container)               | `db`          |
| `DB_PORT`           | Porta do banco                                  | `5432`        |
| `DB_DATABASE`       | Nome do banco de dados                          | `mass_finder` |
| `DB_USERNAME`       | Usuário do banco                                | `postgres`    |
| `DB_PASSWORD`       | Senha do banco                                  | `postgres`    |
| `POSTGRES_DB`       | Nome do banco (usado pelo container PostgreSQL) | `mass_finder` |
| `POSTGRES_USER`     | Usuário PostgreSQL                              | `postgres`    |
| `POSTGRES_PASSWORD` | Senha PostgreSQL                                | `postgres`    |

### Frontend (`frontend/.env`)

| Variável            | Descrição       | Valor padrão                |
| ------------------- | --------------- | --------------------------- |
| `VITE_API_BASE_URL` | URL base da API | `http://localhost:8000/api` |

### Backend (`backend/.env`)

O arquivo `backend/.env.example` contém todas as variáveis necessárias com valores padrão. As mais relevantes:

| Variável         | Descrição                                   | Valor padrão             |
| ---------------- | ------------------------------------------- | ------------------------ |
| `APP_KEY`        | Chave da aplicação (gerada automaticamente) | (vazio)                  |
| `ADMIN_EMAIL`    | Email do administrador                      | `admin@massfinder.local` |
| `ADMIN_PASSWORD` | Senha do administrador                      | `password123`            |
| `DB_CONNECTION`  | Driver do banco                             | `pgsql`                  |
| `DB_HOST`        | Host do banco                               | `db`                     |
| `DB_DATABASE`    | Nome do banco                               | `mass_finder`            |

---

## API

O backend disponibiliza uma **API REST** construída com Laravel. A autenticação é feita via **Laravel Sanctum** (tokens).

### Documentação

A documentação interativa da API está disponível via **Swagger** em:

```
http://localhost:8000/api/documentation
```

A documentação é gerada automaticamente pelo [L5-Swagger](https://github.com/DarkaOnLine/L5-Swagger) com base nas annotations do código.

Para mais detalhes sobre os endpoints, consulte o arquivo `docs/api-documentation.md`.

---

## Possíveis melhorias futuras

- Ampliar cobertura de testes (frontend e backend)
- Busca de paróquias por localização (geolocalização)
- Notificações sobre alterações de horários
- Deploy em produção (CI/CD)
- Melhorias de acessibilidade e UX
- PWA (Progressive Web App) para acesso offline

---

## Autor

Desenvolvido por **Igor Alves**.
