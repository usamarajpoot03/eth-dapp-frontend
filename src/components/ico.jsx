import React, { Component } from "react";
import Web3 from "web3";
import { Button } from "react-bootstrap";

class ICO extends Component {
  state = {
    web3: null,
  };

  componentDidMount = async () => {
    console.log("componentDidMount");
  };

  checkConnectionWithMetamask = async () => {
    console.log(this.props.web3);
  };

  render() {
    return (
      <div>
        hello ico
        <Button
          variant="info"
          type="button"
          onClick={this.checkConnectionWithMetamask}
        >
          Check status
        </Button>
      </div>
    );
  }
}

export default ICO;
