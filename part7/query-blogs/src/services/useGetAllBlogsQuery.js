import { useQuery } from '@tanstack/react-query'

const useGetAllBlogsQuery = (queryKey, queryFn, refetchOnWindowFocus, retry) => {
  return useQuery({
    queryKey,
    queryFn,
    refetchOnWindowFocus,
    retry,
  })
}
export default useGetAllBlogsQuery