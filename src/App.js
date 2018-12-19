import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  ActionSheetIOS,
  Linking
} from "react-native";
import { human } from "react-native-typography";

import Frame from "./components/Frame";
import Window from "./components/Window";
import TouchableHaptic from "./components/TouchableHaptic";
import Settings from "./components/Settings";
import Pane from "./components/Pane";
import Billboard from "./components/Billboard";

import { formatGwei, formatCurrency, currencies } from "./helpers";

const gasEndpoint = `https://ethgasstation.info/json/ethgasAPI.json`;
const ethEndpoint = `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,GBP`;
const API_KEY = `8703745dd362001992299bdd13f73d728341894653cb592d4b070bb793c4600c`;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasErrored: false,
      showGasInCurrency: false,
      defaultCurrency: "USD",
      refreshing: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    this.fetchData().then(() => {
      this.setState({ isLoading: false });
    });
  }

  fetchData() {
    return fetch(gasEndpoint)
      .then(res => res.json())
      .then(json => {
        this.setState({ gasData: json });
      })
      .then(() =>
        fetch(ethEndpoint, {
          headers: {
            Authorization: `Apikey ${API_KEY}`
          }
        })
      )
      .then(res => res.json())
      .then(json => {
        this.setState({ ethData: json });
      })
      .catch(error => {
        this.setState({ hasErrored: true });
      });
  }

  toggleGasFormat() {
    this.setState(prevState => ({
      showGasInCurrency: !prevState.showGasInCurrency
    }));
  }

  openSettings = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "About",
          `${
            this.state.showGasInCurrency
              ? "Show Gas In Gwei"
              : "Show Gas In Currency"
          }`
        ],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 1:
            Linking.openURL(
              `https://github.com/mirshko/unleaded/blob/master/README.md`
            );
            break;
          case 2:
            this.toggleGasFormat();
            break;
        }
      }
    );
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });

    this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  render() {
    if (this.state.hasErrored || this.state.isLoading) {
      return (
        <Frame>
          <Pane>
            {this.state.hasErrored && <Text style={human.largeTitle}>⚠️</Text>}
            {this.state.isLoading && <ActivityIndicator size="large" />}
          </Pane>
          <Settings action={this.openSettings} />
        </Frame>
      );
    }

    const { fast, safeLow, average } = this.state.gasData;

    const locale = this.state.defaultCurrency;

    const gasSpeeds = [
      {
        key: "safeLow",
        speed: "🚜",
        gas: safeLow
      },
      {
        key: "average",
        speed: "🚗",
        gas: average
      },
      {
        key: "fast",
        speed: "🏎",
        gas: fast
      }
    ];

    return (
      <Frame>
        <Window
          refreshFunc={this.handleRefresh}
          refreshingState={this.state.refreshing}
        >
          {gasSpeeds.map(item => (
            <Pane key={item.key}>
              <Pane flex={1}>
                <Text style={human.largeTitle}>{item.speed}</Text>
              </Pane>
              <Pane flex={2} justifyContent="start">
                <TouchableHaptic onPress={() => this.toggleGasFormat()}>
                  <Pane flex={0}>
                    <Billboard>
                      {this.state.showGasInCurrency
                        ? `${
                            currencies[locale].symbol
                          }${formatCurrency(
                            item.gas,
                            this.state.ethData[locale]
                          )}`
                        : formatGwei(item.gas)}
                    </Billboard>
                    {!this.state.showGasInCurrency && (
                      <Text style={human.title3}>Gwei</Text>
                    )}
                  </Pane>
                </TouchableHaptic>
              </Pane>
            </Pane>
          ))}
        </Window>
        <Settings action={this.openSettings} />
      </Frame>
    );
  }
}
