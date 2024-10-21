import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WifiData } from "@/types/type";
import getWifiData from "@/app/actions/getWifiData";

const useWifiMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<WifiData, unknown, URLSearchParams>({
    mutationFn: getWifiData,
    onSuccess: (result) => {
      queryClient.setQueryData(["wifi"], result);
    },
  });

  return mutation;
};

export default useWifiMutation;
