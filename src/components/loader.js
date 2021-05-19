import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import styles from "./loader.style.js";
import CircularProgress from "@material-ui/core/CircularProgress";

/**
 * @description - Renders the loader component.
 * @returns {Node} - Returns html.
 */
class Loader extends Component {
  /**
   * @description - Renders the loader.
   * @returns {Node} - Returns html.
   */
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      </Fragment>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

Loader.defaultProps = {};

export default injectSheet(styles)(Loader);
