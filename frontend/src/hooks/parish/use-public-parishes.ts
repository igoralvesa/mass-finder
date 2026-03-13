import { useInfiniteQuery } from '@tanstack/react-query';
import { getPublicParishes } from '@/api/public-parishes';
import { queryKeys } from '@/utils/query-keys';
import type { GetPublicParishesParams } from '@/api/public-parishes';

export function usePublicParishes(
  params?: Omit<GetPublicParishesParams, 'page'>,
) {
  return useInfiniteQuery({
    queryKey: queryKeys.publicParishes(params),
    queryFn: ({ pageParam }) =>
      getPublicParishes({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.meta;
      return current_page < last_page ? current_page + 1 : undefined;
    },
  });
}
