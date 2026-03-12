export const queryKeys = {
  publicParishes: (params?: object) => ['public', 'parishes', params] as const,
  me: () => ['auth', 'me'] as const,
  parishProfile: () => ['parish', 'profile'] as const,
  parishMassSchedules: () => ['parish', 'mass-schedules'] as const,
  adminParishes: () => ['admin', 'parishes'] as const,
  adminParish: (id: number) => ['admin', 'parishes', id] as const,
  adminParishMassSchedules: (parishId: number) =>
    ['admin', 'parishes', parishId, 'mass-schedules'] as const,
};
