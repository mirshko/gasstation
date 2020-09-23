import useSWR from "swr";

export const GAS_PRICES_ENDPOINT = `https://unleaded-api.vercel.app/api/gas-prices`;

const fetchGasPrices = (key) => fetch(key).then((res) => res.json());

export default function useGasPrices() {
  return useSWR(() => GAS_PRICES_ENDPOINT, fetchGasPrices, {
    refreshInterval: 5000,
  });
}
