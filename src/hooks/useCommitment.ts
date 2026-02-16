import {
  getApiV1CommitmentsActiveOptions,
  getApiV1CommitmentsActiveQueryKey,
  getApiV1CommitmentsIdOptions,
  getApiV1CommitmentsOptions,
  getApiV1CommitmentsQueryKey,
  postApiV1CommitmentsMutation,
} from "@/src/client/@tanstack/react-query.gen";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/** List all commitments */
export function useCommitments(
  options?: Parameters<typeof getApiV1CommitmentsOptions>[0],
) {
  return useQuery(getApiV1CommitmentsOptions(options));
}

/** List active commitments only */
export function useCommitmentsActive(
  options?: Parameters<typeof getApiV1CommitmentsActiveOptions>[0],
) {
  return useQuery(getApiV1CommitmentsActiveOptions(options));
}

/** Get a single commitment by ID */
export function useCommitment(
  id: string | undefined,
  options?: Omit<Parameters<typeof getApiV1CommitmentsIdOptions>[0], "path">,
) {
  return useQuery({
    ...getApiV1CommitmentsIdOptions({ path: { id: id! }, ...options }),
    enabled: !!id,
  });
}

/** Create a new commitment */
export function useCreateCommitment() {
  const queryClient = useQueryClient();
  return useMutation({
    ...postApiV1CommitmentsMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getApiV1CommitmentsQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: getApiV1CommitmentsActiveQueryKey(),
      });
    },
  });
}
