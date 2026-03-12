// ============================================
// DADOS MOCKADOS - SUBSTITUIR POR API REAL
// ============================================
// Este arquivo contém todos os dados mockados da aplicação.
// Quando integrar com backend real, remova este arquivo e
// substitua por chamadas de API nos componentes.

export const mockParishes = [
  {
    id: "1",
    name: "Paróquia São José",
    neighborhood: "Centro",
    address: "Rua das Flores, 123",
    email: "contato@saojose.com.br",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1715807972690-991cf17c954e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBleHRlcmlvciUyMGJ1aWxkaW5nJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzMyNDM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    masses: [
      { id: "1", day: "Domingo", time: "07:00" },
      { id: "2", day: "Domingo", time: "10:00" },
      { id: "3", day: "Domingo", time: "18:00" },
      { id: "4", day: "Quarta-feira", time: "19:30" },
    ],
  },
  {
    id: "2",
    name: "Paróquia Nossa Senhora Aparecida",
    neighborhood: "Jardim Paulista",
    address: "Av. Paulista, 456",
    email: "contato@nsaparecida.com.br",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1728254391899-bbd56c07d02b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGNhdGhlZHJhbCUyMGludGVyaW9yfGVufDF8fHx8MTc3MzMyNDM4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    masses: [
      { id: "5", day: "Sábado", time: "18:00" },
      { id: "6", day: "Domingo", time: "08:00" },
      { id: "7", day: "Domingo", time: "19:00" },
      { id: "8", day: "Terça-feira", time: "19:00" },
    ],
  },
  {
    id: "3",
    name: "Paróquia São Pedro",
    neighborhood: "Vila Mariana",
    address: "Rua Domingos de Morais, 789",
    email: "contato@saopedro.com.br",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1770497142749-2643e7de8385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGNvbG9uaWFsJTIwY2h1cmNoJTIwZmFjYWRlfGVufDF8fHx8MTc3MzMyNDM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    masses: [
      { id: "9", day: "Domingo", time: "09:00" },
      { id: "10", day: "Domingo", time: "11:00" },
      { id: "11", day: "Sexta-feira", time: "18:30" },
    ],
  },
];

export const mockPendingRequests = [
  {
    id: "4",
    name: "Paróquia Santa Rita",
    neighborhood: "Moema",
    address: "Rua Ibirapuera, 321",
    email: "contato@santarita.com.br",
    requestDate: "2026-03-10",
  },
  {
    id: "5",
    name: "Paróquia São Francisco",
    neighborhood: "Pinheiros",
    address: "Rua dos Pinheiros, 654",
    email: "contato@saofrancisco.com.br",
    requestDate: "2026-03-11",
  },
];

export const neighborhoods = [
  "Centro",
  "Jardim Paulista",
  "Vila Mariana",
  "Moema",
  "Pinheiros",
  "Perdizes",
  "Santana",
  "Tatuapé",
];

export const daysOfWeek = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];