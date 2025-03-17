import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const useRefresh = () => {
  const queryClient = useQueryClient();

  return {
    refreshing: useCallback((key: string[]) => {
      key.map((k) => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey.includes(k);
          },
        });
        queryClient.refetchQueries({
          predicate: (query) => {
            return query.queryKey.includes(k);
          },
          type: "active",
        });
      });

      return true;
    }, []),
  };
};

export default useRefresh;
