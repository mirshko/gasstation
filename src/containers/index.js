import { useEffect, useState } from "react";
import { ActionSheetIOS, Alert } from "react-native";
import { createContainer } from "unstated-next";
import useEthPrices from "../hooks/useEthPrices";
import useGasPrices from "../hooks/useGasPrices";
import useGasGuzzlers from "../hooks/useGasGuzzlers";
import useConfig from "../hooks/useConfig";

const currencyOptionArray = ["USD", "GBP", "EUR", "CAD", "CNY", "RON", "JPY"];

const useApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [refreshing, setIsRefreshing] = useState(false);

  const {
    data: gasData,
    revalidate: gasDataRevalidate,
    error: gasDataError,
  } = useGasPrices();

  const {
    data: ethData,
    revalidate: ethDataRevalidate,
    error: ethDataError,
  } = useEthPrices();

  const {
    data: guzzlerData,
    revalidate: guzzlerDataRevalidate,
    error: guzzlerDataError,
  } = useGasGuzzlers();

  const { config, updateConfig } = useConfig();

  const [showGasInCurrency, toggleShowGasInCurrency] = useState(false);
  const [nativeCurrency, setNativeCurrency] = useState("USD");

  useEffect(() => {
    const bootApp = async () => {
      await loadUserConfig();

      await fetchData();

      setIsLoading(false);
    };

    bootApp();
  }, []);

  const handleShowGasInCurrency = async () => {
    toggleShowGasInCurrency(!showGasInCurrency);

    await updateConfig({
      showGasInCurrency: !showGasInCurrency,
    });
  };

  const loadUserConfig = async () => {
    try {
      if (config) {
        toggleShowGasInCurrency(config.showGasInCurrency || showGasInCurrency);
        setNativeCurrency(config.nativeCurrency || nativeCurrency);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);

    await fetchData();

    setIsRefreshing(false);
  };

  const handleChangeCurrency = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", ...currencyOptionArray],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex > 0) {
          setIsLoading(true);

          const selectedCurrency = currencyOptionArray[buttonIndex - 1];

          setNativeCurrency(selectedCurrency);

          await updateConfig({
            nativeCurrency: selectedCurrency,
          });

          await fetchData();

          setIsLoading(false);
        }
      }
    );
  };

  const handleError = () =>
    Alert.alert(
      "Unable To Load Data",
      "Ethereum and gas data can not be loaded at this time.",
      [
        {
          text: "Reload",
          onPress: async () => {
            setIsLoading(true);
            setHasErrored(false);

            await fetchData();

            setIsLoading(false);
          },
        },
      ]
    );

  const fetchData = async () => {
    try {
      await gasDataRevalidate();
      await guzzlerDataRevalidate();
      await ethDataRevalidate();
    } catch (error) {
      console.error(error);

      setHasErrored(true);

      handleError();
    }
  };

  return {
    isLoading,
    hasErrored,
    refreshing,

    gasData,
    ethData,
    guzzlerData,

    handleChangeCurrency,
    handleRefresh,

    showGasInCurrency,
    handleShowGasInCurrency,
    nativeCurrency,
  };
};

export let AppContainer = createContainer(useApp);
