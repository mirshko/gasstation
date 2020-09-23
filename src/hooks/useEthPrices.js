import store from "react-native-simple-store";
import useSWR from "swr";
import { loadConfig } from "../helpers";

export const ETH_PRICES_ENDPOINT = `https://unleaded-api.vercel.app/api/eth-prices`;

const fetchEthPrices = async (key) => {
  let fiat = "USD";

  const config = await store.get("config");

  console.log(config);

  if (loadConfig(config)) {
    fiat = config.nativeCurrency;
  }

  const res = await fetch(key + "?fiat=" + fiat);

  return res.json();
};

export default function useEthPrices() {
  return useSWR(() => ETH_PRICES_ENDPOINT, fetchEthPrices, {
    refreshInterval: 5000,
  });
}
