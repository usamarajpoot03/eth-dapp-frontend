import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";

//stateless functional component
class Navbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-expand navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            ETH DAppp
          </Link>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/dexTokens">
                  deX Tokens
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/ico">
                  ICO
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/crypto-assets">
                  Crypto Assets
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li>
                <Button
                  style={{ float: "right" }}
                  variant="info"
                  type="button"
                  onClick={this.props.connectWithMetamask}
                >
                  {this.props.web3Loading ? (
                    <div>
                      {" "}
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading...
                    </div>
                  ) : (
                    <div>Connect</div>
                  )}
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
