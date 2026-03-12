import { useQuery } from '@tanstack/react-query';
import { getPublicParishes } from '@/api/public-parishes';
import { queryKeys } from '@/utils/query-keys';
import type { GetPublicParishesParams } from '@/api/public-parishes';

export function usePublicParishes(params?: GetPublicParishesParams) {
  return useQuery({
    queryKey: queryKeys.publicParishes(params),
    queryFn: () => getPublicParishes(params),
  });
}
