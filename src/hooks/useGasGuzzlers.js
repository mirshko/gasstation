import useSWR from "swr";

export const GUZZLER_ENDPOINT = `https://unleaded-api.vercel.app/api/gas-guzzlers`;

const fetchGasGuzzlers = (key) => fetch(key).then((res) => res.json());

export default function useGasGuzzlers() {
  return useSWR(() => GUZZLER_ENDPOINT, fetchGasGuzzlers, {
    refreshInterval: 20000,
  });
}
