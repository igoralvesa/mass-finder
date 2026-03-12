# API Documentation - Mass Finder

Base URL: `http://localhost:8000/api`

## Autenticação

Endpoints protegidos exigem o header:

```
Authorization: Bearer {token}
```

O token é obtido no endpoint de login.

---

## Public (sem autenticação)

| Método | Endpoint                    | Descrição                                        |
| ------ | --------------------------- | ------------------------------------------------ |
| `GET`  | `/api/public/parishes`      | Listar paróquias aprovadas (paginado, 10/página) |
| `GET`  | `/api/public/parishes/{id}` | Exibir paróquia (só se aprovada)                 |

### GET /api/public/parishes

**Query Params:**

| Param          | Tipo       | Obrigatório | Descrição                                             |
| -------------- | ---------- | ----------- | ----------------------------------------------------- |
| `neighborhood` | string     | Não         | Filtro por bairro (busca parcial, case insensitive)   |
| `day_of_week`  | string/int | Não         | Filtro por dia da semana (0-6 ou "sunday"-"saturday") |

**Resposta 200:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Paróquia Boa Viagem",
      "cnpj": "12.345.678/0001-99",
      "neighborhood": "Boa Viagem",
      "address": "Rua Exemplo, 123"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": { "current_page": 1, "last_page": 1, "per_page": 10, "total": 1 }
}
```

### GET /api/public/parishes/{id}

**Resposta 200:**

```json
{
  "data": {
    "id": 1,
    "name": "Paróquia Boa Viagem",
    "cnpj": "12.345.678/0001-99",
    "neighborhood": "Boa Viagem",
    "address": "Rua Exemplo, 123",
    "mass_schedules": [
      {
        "id": 1,
        "parish_id": 1,
        "day_of_week": 0,
        "time": "08:00",
        "notes": "Missa dominical"
      }
    ]
  }
}
```

**Resposta 404 (paróquia não aprovada):**

```json
{ "message": "Paróquia não encontrada." }
```

---

## Auth

| Método | Endpoint                             | Descrição                      | Auth   |
| ------ | ------------------------------------ | ------------------------------ | ------ |
| `POST` | `/api/auth/register-parish`          | Cadastrar paróquia             | Não    |
| `POST` | `/api/auth/login`                    | Login                          | Não    |
| `GET`  | `/api/auth/verify-email/{id}/{hash}` | Verificar email (URL assinada) | Não    |
| `POST` | `/api/auth/logout`                   | Logout                         | Bearer |
| `GET`  | `/api/auth/me`                       | Dados do usuário logado        | Bearer |

### POST /api/auth/register-parish

**Body:**

| Campo                   | Tipo   | Obrigatório | Regras                     |
| ----------------------- | ------ | ----------- | -------------------------- |
| `name`                  | string | Sim         | max:255                    |
| `email`                 | string | Sim         | email, unique              |
| `password`              | string | Sim         | min:8, confirmed           |
| `password_confirmation` | string | Sim         | deve ser igual ao password |
| `cnpj`                  | string | Sim         | max:18, unique             |
| `neighborhood`          | string | Não         | max:255                    |
| `address`               | string | Não         | max:500                    |

**Resposta 201:**

```json
{
  "message": "Paróquia cadastrada com sucesso. Verifique seu email.",
  "data": {
    "user": {
      "id": 1,
      "name": "Paróquia Exemplo",
      "email": "contato@paroquia.com",
      "role": "parish",
      "email_verified_at": null,
      "parish": {
        "id": 1,
        "name": "Paróquia Exemplo",
        "cnpj": "12.345.678/0001-99",
        "neighborhood": "Centro",
        "address": "Rua A, 100",
        "mass_schedules": []
      }
    }
  }
}
```

### POST /api/auth/login

**Body:**

| Campo      | Tipo   | Obrigatório |
| ---------- | ------ | ----------- |
| `email`    | string | Sim         |
| `password` | string | Sim         |

**Resposta 200:**

```json
{
  "message": "Login realizado com sucesso.",
  "data": {
    "token": "1|abc123...",
    "user": {
      "id": 1,
      "name": "Paróquia Exemplo",
      "email": "contato@paroquia.com",
      "role": "parish",
      "email_verified_at": "2026-03-10T00:00:00.000000Z",
      "parish": {
        "id": 1,
        "name": "Paróquia Exemplo",
        "cnpj": "12.345.678/0001-99",
        "neighborhood": "Centro",
        "address": "Rua A, 100",
        "mass_schedules": []
      }
    }
  }
}
```

**Resposta 401:**

```json
{ "message": "Credenciais inválidas." }
```

### POST /api/auth/logout

**Headers:** `Authorization: Bearer {token}`

**Resposta 200:**

```json
{ "message": "Logout realizado com sucesso." }
```

### GET /api/auth/me

**Headers:** `Authorization: Bearer {token}`

**Resposta 200:**

```json
{
  "data": {
    "id": 1,
    "name": "Paróquia Exemplo",
    "email": "contato@paroquia.com",
    "role": "parish",
    "email_verified_at": "2026-03-10T00:00:00.000000Z",
    "parish": {
      "id": 1,
      "name": "Paróquia Exemplo",
      "cnpj": "12.345.678/0001-99",
      "neighborhood": "Centro",
      "address": "Rua A, 100",
      "mass_schedules": []
    }
  }
}
```

---

## Parish (Bearer + role `parish`)

| Método   | Endpoint                          | Descrição                   |
| -------- | --------------------------------- | --------------------------- |
| `GET`    | `/api/parish/profile`             | Ver perfil da paróquia      |
| `PUT`    | `/api/parish/profile`             | Atualizar perfil            |
| `GET`    | `/api/parish/mass-schedules`      | Listar horários             |
| `POST`   | `/api/parish/mass-schedules`      | Criar horário               |
| `PUT`    | `/api/parish/mass-schedules/{id}` | Atualizar horário (próprio) |
| `DELETE` | `/api/parish/mass-schedules/{id}` | Remover horário (próprio)   |

### GET /api/parish/profile

**Resposta 200:**

```json
{
  "data": {
    "id": 1,
    "name": "Paróquia Exemplo",
    "cnpj": "12.345.678/0001-99",
    "neighborhood": "Centro",
    "address": "Rua A, 100",
    "mass_schedules": [
      {
        "id": 1,
        "parish_id": 1,
        "day_of_week": 0,
        "time": "08:00",
        "notes": "Missa dominical"
      }
    ]
  }
}
```

### PUT /api/parish/profile

**Body:**

| Campo          | Tipo   | Obrigatório | Regras  |
| -------------- | ------ | ----------- | ------- |
| `name`         | string | Sim         | max:255 |
| `neighborhood` | string | Não         | max:255 |
| `address`      | string | Não         | max:500 |

**Resposta 200:**

```json
{
  "message": "Perfil atualizado com sucesso.",
  "data": { "...ParishDetailResource" }
}
```

### GET /api/parish/mass-schedules

**Resposta 200:**

```json
{
  "data": [
    {
      "id": 1,
      "parish_id": 1,
      "day_of_week": 0,
      "time": "08:00",
      "notes": "Missa dominical"
    }
  ]
}
```

### POST /api/parish/mass-schedules

**Body:**

| Campo         | Tipo    | Obrigatório | Regras                   |
| ------------- | ------- | ----------- | ------------------------ |
| `day_of_week` | integer | Sim         | 0 (domingo) a 6 (sábado) |
| `time`        | string  | Sim         | formato "HH:MM" (24h)    |
| `notes`       | string  | Não         | max:500                  |

**Resposta 201:**

```json
{
  "message": "Horário criado com sucesso.",
  "data": {
    "id": 1,
    "parish_id": 1,
    "day_of_week": 0,
    "time": "08:00",
    "notes": "Missa dominical"
  }
}
```

### PUT /api/parish/mass-schedules/{id}

**Body:** mesmo do POST (day_of_week, time, notes)

**Resposta 200:**

```json
{
  "message": "Horário atualizado com sucesso.",
  "data": { "...MassScheduleResource" }
}
```

**Resposta 404 (horário de outra paróquia):**

```json
{ "message": "Horário não encontrado." }
```

### DELETE /api/parish/mass-schedules/{id}

**Resposta 200:**

```json
{ "message": "Horário removido com sucesso." }
```

**Resposta 404 (horário de outra paróquia):**

```json
{ "message": "Horário não encontrado." }
```

---

## Admin (Bearer + role `admin`)

| Método   | Endpoint                                  | Descrição                       |
| -------- | ----------------------------------------- | ------------------------------- |
| `GET`    | `/api/admin/parishes`                     | Listar todas as paróquias       |
| `GET`    | `/api/admin/parishes/{id}`                | Ver paróquia com detalhes       |
| `PATCH`  | `/api/admin/parishes/{id}/approve`        | Aprovar paróquia                |
| `PATCH`  | `/api/admin/parishes/{id}/reject`         | Rejeitar paróquia               |
| `PUT`    | `/api/admin/parishes/{id}`                | Editar paróquia                 |
| `DELETE` | `/api/admin/parishes/{id}`                | Remover paróquia                |
| `GET`    | `/api/admin/parishes/{id}/mass-schedules` | Listar horários de uma paróquia |
| `POST`   | `/api/admin/parishes/{id}/mass-schedules` | Criar horário para uma paróquia |
| `PUT`    | `/api/admin/mass-schedules/{id}`          | Atualizar horário               |
| `DELETE` | `/api/admin/mass-schedules/{id}`          | Remover horário                 |

### GET /api/admin/parishes

**Resposta 200:**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Paróquia Exemplo",
      "cnpj": "12.345.678/0001-99",
      "neighborhood": "Centro",
      "address": "Rua A, 100",
      "status": "pending",
      "rejection_reason": null
    }
  ]
}
```

### GET /api/admin/parishes/{id}

**Resposta 200:**

```json
{
  "data": {
    "id": 1,
    "user_id": 1,
    "name": "Paróquia Exemplo",
    "cnpj": "12.345.678/0001-99",
    "neighborhood": "Centro",
    "address": "Rua A, 100",
    "status": "pending",
    "rejection_reason": null,
    "mass_schedules": []
  }
}
```

### PATCH /api/admin/parishes/{id}/approve

**Body:** nenhum

**Resposta 200:**

```json
{
  "message": "Paróquia aprovada com sucesso.",
  "data": { "...AdminParishResource (status: approved)" }
}
```

### PATCH /api/admin/parishes/{id}/reject

**Body:**

| Campo              | Tipo   | Obrigatório | Regras   |
| ------------------ | ------ | ----------- | -------- |
| `rejection_reason` | string | Sim         | max:1000 |

**Resposta 200:**

```json
{
  "message": "Paróquia rejeitada.",
  "data": { "...AdminParishResource (status: rejected)" }
}
```

### PUT /api/admin/parishes/{id}

**Body:**

| Campo              | Tipo   | Obrigatório | Regras                            |
| ------------------ | ------ | ----------- | --------------------------------- |
| `name`             | string | Sim         | max:255                           |
| `cnpj`             | string | Sim         | max:18, unique (ignora o próprio) |
| `neighborhood`     | string | Não         | max:255                           |
| `address`          | string | Não         | max:500                           |
| `status`           | string | Não         | in: pending, approved, rejected   |
| `rejection_reason` | string | Não         | max:1000                          |

**Resposta 200:**

```json
{
  "message": "Paróquia atualizada com sucesso.",
  "data": { "...AdminParishResource" }
}
```

### DELETE /api/admin/parishes/{id}

**Resposta 200:**

```json
{ "message": "Paróquia removida com sucesso." }
```

### GET /api/admin/parishes/{id}/mass-schedules

**Resposta 200:**

```json
{
  "data": [
    {
      "id": 1,
      "parish_id": 1,
      "day_of_week": 0,
      "time": "08:00",
      "notes": null
    }
  ]
}
```

### POST /api/admin/parishes/{id}/mass-schedules

**Body:**

| Campo         | Tipo    | Obrigatório | Regras                   |
| ------------- | ------- | ----------- | ------------------------ |
| `day_of_week` | integer | Sim         | 0 (domingo) a 6 (sábado) |
| `time`        | string  | Sim         | formato "HH:MM" (24h)    |
| `notes`       | string  | Não         | max:500                  |

**Resposta 201:**

```json
{
  "message": "Horário criado com sucesso.",
  "data": { "...MassScheduleResource" }
}
```

### PUT /api/admin/mass-schedules/{id}

**Body:** mesmo do POST (day_of_week, time, notes)

**Resposta 200:**

```json
{
  "message": "Horário atualizado com sucesso.",
  "data": { "...MassScheduleResource" }
}
```

### DELETE /api/admin/mass-schedules/{id}

**Resposta 200:**

```json
{ "message": "Horário removido com sucesso." }
```

---

## Referência: day_of_week

| Valor | Dia                |
| ----- | ------------------ |
| 0     | Domingo (Sunday)   |
| 1     | Segunda (Monday)   |
| 2     | Terça (Tuesday)    |
| 3     | Quarta (Wednesday) |
| 4     | Quinta (Thursday)  |
| 5     | Sexta (Friday)     |
| 6     | Sábado (Saturday)  |

---

## Códigos de erro

| Código | Quando                                            | Formato                                                     |
| ------ | ------------------------------------------------- | ----------------------------------------------------------- |
| `401`  | Sem token ou token inválido                       | `{ "message": "Unauthenticated." }`                         |
| `403`  | Role errado (parish em rota admin ou vice-versa)  | `{ "message": "Acesso negado." }`                           |
| `404`  | Recurso não encontrado ou não pertence ao usuário | `{ "message": "..." }`                                      |
| `422`  | Validação falhou                                  | `{ "message": "...", "errors": { "campo": ["mensagem"] } }` |
