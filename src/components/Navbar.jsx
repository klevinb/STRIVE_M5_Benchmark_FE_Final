import React, { Component } from "react";
import { Navbar, Nav, InputGroup, FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom'

class NetflixNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };
  }

  searchStringHandler = (e) => {
    if (e.keyCode === 13) {
      // WHEN ENTER KEY IS PRESSED
      this.props.showSearchResult(e.currentTarget.value);
    } else {
      this.setState({ searchString: e.currentTarget.value });
    }
  };

  render() {
    return (
      <>
        {!this.props.register ?
          <>
            <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
              <Navbar.Brand>
                <img
                  src="/assets/logo.png"
                  alt="logo"
                  style={{ width: "100px", height: "55px" }}
                  onClick={() => {
                    this.props.props.history.push("/")
                  }}
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link to={"/"} className="nav-link font-weight-bold">
                    Home
            </Link>
                  <Link to={"/"} className="nav-link font-weight-bold">
                    TV Shows
            </Link>
                  <Link to={"/"} className="nav-link font-weight-bold">
                    Movies
            </Link>
                  <Link to={"/"} className="nav-link font-weight-bold">
                    Recently Added
            </Link>
                  <Link to={"/"} className="nav-link font-weight-bold">
                    My List
            </Link>
                  <Link to={"/register"} className="nav-link font-weight-bold">
                    Register
            </Link>
                </Nav>
                <span className="d-none d-md-flex align-items-center">
                  <InputGroup className="icons">
                    <FormControl
                      placeholder="Search and press enter"
                      aria-label="search"
                      aria-describedby="basic-addon1"
                      onKeyDown={this.searchStringHandler}
                      onChange={this.searchStringHandler}
                      value={this.state.searchString}
                    />
                  </InputGroup>
                  <div id="kids">KIDS</div>
                  <i className="fa fa-bell icons"></i>
                  <i className="fa fa-user icons"></i>
                </span>
              </Navbar.Collapse>
            </Navbar>
          </>
          :
          <>
            <Navbar variant="dark" expand="lg" style={{ backgroundColor: "#221f1f" }}>
              <Navbar.Brand>
                <img
                  src="/assets/logo.png"
                  alt="logo"
                  style={{ width: "100px", height: "55px" }}
                  onClick={() => {
                    this.props.props.history.push("/")
                  }}
                />
              </Navbar.Brand>
            </Navbar>
          </>

        }

      </>
    );
  }
}

export default NetflixNavbar;
