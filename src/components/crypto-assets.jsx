import React, { Component } from "react";
import MetaMaskNotConnected from "../helping-components/metamaskError";
import Color from "../contracts/crypto-assets/Color.json";
import styled from "styled-components";
import { PageTitle } from "../styling/style";
class CryptoAssets extends Component {
  state = {
    web3: null,
    totalSupply: "",
    colors: [],
    colorContract: null,
    accounts: [],
  };

  componentDidMount = async () => {
    if (this.props.web3 != null) {
      this.initializeContractData();
    }
  };

  initializeContractData = async () => {
    this.web3 = this.props.web3;
    this.setState({ web3: this.web3 });

    // Use web3 to get the user's accounts.
    this.accounts = await this.web3.eth.getAccounts();
    this.setState({ accounts: this.accounts });
    // Get the contract instance.
    this.networkId = await this.web3.eth.net.getId();

    this.colorContractInstance = new this.web3.eth.Contract(
      Color.abi,
      Color.networks[this.networkId] && Color.networks[this.networkId].address
    );

    this.setState({ colorContract: this.colorContractInstance });
    const totalSupply = await this.colorContractInstance.methods
      .totalSupply()
      .call();

    this.setState({ totalSupply });

    let colors = [];
    for (var i = 0; i < totalSupply; i++) {
      const color = await this.colorContractInstance.methods
        .colors(i)
        .call({ from: this.state.accounts[0] });
      colors.push(color);
    }

    this.setState({ colors });
  };

  componentDidUpdate = async (nextProps) => {
    const { web3 } = this.props;
    if (!this.state.web3 && web3) {
      this.initializeContractData();
    }
  };

  mint = async (color) => {
    if (this.state.colorContract) {
      this.state.colorContract.methods
        .mint(color)
        .send({ from: this.state.accounts[0] })
        .once("receipt", (receipt) => {
          this.setState({ colors: [...this.state.colors, color] });
        });
    } else {
      alert("Contract not loaded");
    }
  };

  render() {
    if (!this.state.web3) return <MetaMaskNotConnected />;
    return (
      <div>
        <PageTitle>Crypto Assets</PageTitle>
        <div className="container-fluid mt-5">
          <div className="row text-center mb-2">
            Total Supply: {this.state.totalSupply}
          </div>
          <div className="row text-center mb-2">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Tokens</h1>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const color = this.color.value;
                    this.mint(color);
                  }}
                >
                  <input
                    type="text"
                    className="form-control mb-1"
                    placeholder="e.g. #FFFFFF"
                    ref={(input) => {
                      this.color = input;
                    }}
                  ></input>
                  <input
                    type="submit"
                    className="btn btn-block btn-primary "
                    value="MINT"
                  ></input>
                </form>
              </div>
            </main>
          </div>
          <div className="row text-center">
            {this.state.colors.map((color, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div
                    className="token"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>{color}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CryptoAssets;
