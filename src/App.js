import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import HomePage from "./components/homepage";
import DeXTokens from "./components/dexTokens";
import CryptoAssets from "./components/crypto-assets";
import ICO from "./components/ico";
import Web3 from "web3";

class App extends Component {
  state = { web3: null, web3Loading: false };
  connectWithMetamask = async () => {
    this.setState({ web3Loading: true });

    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function () {
          // User has allowed account access to DApp...
        });
        this.setState({ web3: web3, web3Loading: false });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      this.setState({ web3: web3, web3Loading: false });
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
  };

  render() {
    return (
      <div>
        <Navbar
          connectWithMetamask={this.connectWithMetamask}
          web3Loading={this.state.web3Loading}
        ></Navbar>
        <div className="container-lg">
          <Switch>
            <Route
              path="/dexTokens"
              render={(props) => (
                <DeXTokens web3={this.state.web3} {...props} />
              )}
            ></Route>
            <Route
              path="/ico"
              render={(props) => <ICO web3={this.state.web3} {...props} />}
            ></Route>
            <Route
              path="/crypto-assets"
              render={(props) => (
                <CryptoAssets web3={this.state.web3} {...props} />
              )}
            ></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={HomePage}></Route>
            <Redirect to="/not-found"> </Redirect>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
