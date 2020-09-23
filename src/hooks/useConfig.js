import { useCallback, useMemo } from "react";
import store from "react-native-simple-store";
import useSWR from "swr";

const fetchConfig = async (key) => {
  return store.get(key);
};

export default function useConfig() {
  const { data, mutate } = useSWR("config", fetchConfig);

  const updateConfig = useCallback(
    /**
     * @param {object} key
     */
    async (key) => {
      await store.update("config", {
        ...key,
      });

      await mutate({
        ...data,
        ...key,
      });
    },
    []
  );

  const config = useMemo(() => data, [data]);

  return {
    config,
    updateConfig,
  };
}
