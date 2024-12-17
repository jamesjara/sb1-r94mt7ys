import { useQuery } from '@tanstack/react-query';
import { bitstampApi } from '../services/bitstamp/api';

export function useBitstampPairs() {
  return useQuery({
    queryKey: ['bitstamp', 'pairs'],
    queryFn: () => bitstampApi.getTradingPairs(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}