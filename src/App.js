import React, { Component } from "react";
import "./App.css";
import { Container, Alert, Dropdown } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";

const apiKey = process.env.REACT_APP_API_URL

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchedMovies: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount = async () => {
    console.log(apiKey)
    const resp = await fetch(apiKey + "/media")
    if (resp.ok) {
      const movies = await resp.json()
      this.setState({
        movies,
        loading: false
      });
    }
  };

  showSearchResult = (searchString) => {
    fetch(this.url + "&s=" + searchString)
      .then((response) => response.json())
      .then((responseObject) =>
        this.setState({ searchedMovies: responseObject.Search })
      );
  };

  render() {
    return (

      <div className="App">
        <div>
          <Navbar showSearchResult={this.showSearchResult} />
          <Container fluid className="px-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <h2 className="mb-4">TV Shows</h2>
                <div className="ml-4 mt-1">
                  <Dropdown>
                    <Dropdown.Toggle
                      style={{ backgroundColor: "#221f1f" }}
                      id="dropdownMenuButton"
                      className="btn-secondary btn-sm dropdown-toggle rounded-0"
                    >
                      Genres
                    </Dropdown.Toggle>
                    <Dropdown.Menu bg="dark">
                      <Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div>
                <i className="fa fa-th-large icons"></i>
                <i className="fa fa-th icons"></i>
              </div>
            </div>
            {this.state.error && (
              <Alert variant="danger" className="text-center">
                An error has occurred, please try again later
              </Alert>
            )}
            {this.state.searchedMovies.length > 0 && (


              <Gallery
                title="Search results"
                movies={this.state.searchedMovies}
                props={this.props}
              />

            )}
            {!this.state.error && !this.state.searchedMovies.length > 0 && (
              <>
                <Gallery
                  title="Movies"
                  loading={this.state.loading}
                  movies={this.state.movies}
                  props={this.props}
                />

              </>
            )}
            <Footer />
          </Container>
        </div>
      </div>


    );
  }
}

export default App;
