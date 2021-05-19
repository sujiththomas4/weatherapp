import React, { Component, Fragment } from "react";
import injectSheet from "react-jss";
import styles from "./App.style.js";
import WeatherDetails from "./components/weatherDetails";

/**
 * @description - Render the App class.
 * @returns {Node} - HTML code.
 */
class App extends Component {
  render() {
    return (
      <Fragment>
        <WeatherDetails />
      </Fragment>
    );
  }
}

export default injectSheet(styles)(App);
