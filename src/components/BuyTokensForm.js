import React, { Component } from "react";

import { Button } from "react-bootstrap";

class BuyTokensForm extends Component {
  render() {
    return (
      <Button style={{ float: "left" }} type="button" onClick={this.props.buyTokens}>
        Buy Tokens{" "}
      </Button>
    );
  }
}

export default BuyTokensForm;
