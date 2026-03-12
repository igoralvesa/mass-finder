# Guia de Integração com API

Este documento descreve onde e como substituir os dados mockados por chamadas de API real.

## 📁 Arquivo de Dados Mockados

**Arquivo:** `/src/app/data/mockData.ts`
- Contém todos os dados mockados da aplicação
- Pode ser removido completamente após integração com API

---

## 🔄 Endpoints Necessários

### Autenticação

#### POST /api/auth/parish/login
**Onde:** `ParishLogin.tsx` (linha ~13)
```typescript
// Autenticação de paróquia
{
  email: string,
  password: string
}
// Retorna: { token: string, parish: {...} }
```

#### POST /api/parishes/register
**Onde:** `RegisterParish.tsx` (linha ~13)
```typescript
// Cadastro de nova paróquia (pendente aprovação)
{
  name: string,
  neighborhood: string,
  address: string,
  email: string,
  password: string
}
// Retorna: { message: string }
```

---

### Área Pública

#### GET /api/parishes/search
**Onde:** `Home.tsx` (linha ~10)
```typescript
// Buscar paróquias com filtros
// Query params: ?neighborhood=string&day=string
// Retorna: Parish[]
```

#### GET /api/neighborhoods
**Onde:** `Home.tsx` (linha ~10)
```typescript
// Listar todos os bairros disponíveis
// Retorna: string[]
```

---

### Dashboard da Paróquia

#### GET /api/parishes/me
**Onde:** `ParishDashboard.tsx` (linha ~19)
```typescript
// Buscar dados da paróquia logada
// Headers: Authorization: Bearer {token}
// Retorna: Parish
```

#### PUT /api/parishes/me
**Onde:** `ParishDashboard.tsx` (linha ~57)
```typescript
// Atualizar dados da paróquia
// Headers: Authorization: Bearer {token}
{
  name: string,
  neighborhood: string,
  address: string,
  email: string
}
// Retorna: Parish
```

#### GET /api/masses
**Onde:** `ParishDashboard.tsx` (linha ~169)
```typescript
// Listar horários de missa da paróquia logada
// Headers: Authorization: Bearer {token}
// Retorna: Mass[]
```

#### POST /api/masses
**Onde:** `ParishDashboard.tsx` (linha ~127)
```typescript
// Criar novo horário de missa
// Headers: Authorization: Bearer {token}
{
  day: string,
  time: string
}
// Retorna: Mass
```

#### PUT /api/masses/:id
**Onde:** `MassScheduleTable.tsx` (implementar onEdit)
```typescript
// Atualizar horário de missa
// Headers: Authorization: Bearer {token}
{
  day: string,
  time: string
}
// Retorna: Mass
```

#### DELETE /api/masses/:id
**Onde:** `MassScheduleTable.tsx` (implementar onDelete)
```typescript
// Deletar horário de missa
// Headers: Authorization: Bearer {token}
// Retorna: { message: string }
```

---

### Dashboard Admin

#### GET /api/admin/parishes
**Onde:** `AdminDashboard.tsx` (linha ~16)
```typescript
// Listar todas as paróquias aprovadas
// Headers: Authorization: Bearer {token}
// Retorna: Parish[]
```

#### PUT /api/admin/parishes/:id/disable
**Onde:** `AdminDashboard.tsx` (linha ~77)
```typescript
// Desativar paróquia
// Headers: Authorization: Bearer {token}
// Retorna: { message: string }
```

#### GET /api/admin/requests
**Onde:** `AdminDashboard.tsx` (linha ~23)
```typescript
// Listar solicitações pendentes de cadastro
// Headers: Authorization: Bearer {token}
// Retorna: ParishRequest[]
```

#### POST /api/admin/requests/:id/approve
**Onde:** `AdminDashboard.tsx` (linha ~134)
```typescript
// Aprovar solicitação de cadastro
// Headers: Authorization: Bearer {token}
// Retorna: { message: string }
```

#### POST /api/admin/requests/:id/reject
**Onde:** `AdminDashboard.tsx` (linha ~145)
```typescript
// Rejeitar solicitação de cadastro
// Headers: Authorization: Bearer {token}
// Retorna: { message: string }
```

---

## 🏗️ Estrutura de Dados

### Parish
```typescript
{
  id: string,
  name: string,
  neighborhood: string,
  address: string,
  email: string,
  status: "active" | "inactive",
  masses: Mass[]
}
```

### Mass
```typescript
{
  id: string,
  day: string, // Dia da semana
  time: string // HH:MM
}
```

### ParishRequest
```typescript
{
  id: string,
  name: string,
  neighborhood: string,
  address: string,
  email: string,
  requestDate: string // ISO date
}
```

---

## ✅ Checklist de Integração

### Página Home
- [ ] Substituir `mockParishes` por chamada GET /api/parishes/search
- [ ] Implementar filtros funcionais no FilterBar
- [ ] Adicionar estados de loading e erro

### Autenticação
- [ ] Implementar POST /api/auth/parish/login no ParishLogin
- [ ] Implementar POST /api/parishes/register no RegisterParish
- [ ] Adicionar proteção de rotas (verificar token)

### Dashboard Paróquia
- [ ] Buscar dados com GET /api/parishes/me
- [ ] Implementar atualização com PUT /api/parishes/me
- [ ] Listar missas com GET /api/masses
- [ ] Criar missa com POST /api/masses
- [ ] Editar missa com PUT /api/masses/:id
- [ ] Deletar missa com DELETE /api/masses/:id

### Dashboard Admin
- [ ] Listar paróquias com GET /api/admin/parishes
- [ ] Desativar paróquia com PUT /api/admin/parishes/:id/disable
- [ ] Listar solicitações com GET /api/admin/requests
- [ ] Aprovar com POST /api/admin/requests/:id/approve
- [ ] Rejeitar com POST /api/admin/requests/:id/reject

---

## 💡 Dicas de Implementação

1. **Criar um serviço de API centralizado:**
```typescript
// /src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const api = {
  get: (endpoint, token?) => fetch(...),
  post: (endpoint, data, token?) => fetch(...),
  put: (endpoint, data, token?) => fetch(...),
  delete: (endpoint, token?) => fetch(...)
};
```

2. **Usar React Query ou SWR** para gerenciamento de estado assíncrono

3. **Adicionar tratamento de erros** em todas as chamadas

4. **Implementar interceptors** para adicionar token automaticamente

5. **Adicionar estados de loading** nos componentes que fazem requisições

6. **Remover o arquivo** `/src/app/data/mockData.ts` após integração completa
