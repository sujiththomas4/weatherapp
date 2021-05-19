import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import styles from "./weatherDetails.style.js";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { getWeatherDetails } from "../actions/index.js";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Bar } from "react-chartjs-2";
import Carousel from "react-elastic-carousel";
import Loader from "./loader";

/**
 * @description - Renders the weather details component.
 * @returns {Node} - Returns html.
 */
class WeatherDetails extends Component {
  /**
   * @description - Constructor for the class.
   * @param {Object} props - Object props.
   */
  constructor(props) {
    super(props);
    this.state = {
      value: "celsius",
      bar_labels: [],
      bar_values: [],
    };
  }

  /**
   * @description - Lifecycle hook.
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getWeatherDetails());
  }

  /**
   * @description - Function called on radio button click.
   * @param {Object} event - Event object.
   */
  handleChange = (event) => {
    const { bar_values } = this.state;
    let temperatures = bar_values.map((item) =>
      this.switchTempUnit(item, event.target.value)
    );
    this.setState({
      value: event.target.value,
      bar_values: temperatures,
    });
  };

  /**
   * @description - Calculates avg temperature for a particular day.
   * @param {Array} array - Array of data containing weather info.
   * @param {String} date - Date string.
   * @returns {Number} - Returns avg temperature for a day.
   */
  getAvgTemp = (array, date) => {
    let data = array.filter(
      (val) => moment(val.dt_txt).format("MM/DD/yy") === date
    );
    let total_temp = data
      .map((val) => val.main.temp)
      .reduce((acc, curr) => acc + curr, 0);
    let avg_temp = total_temp / data.length;
    return avg_temp;
  };

  /**
   * @description - Calculates the temperature value after conversion of unit.
   * @param {Number} value - Temperature value.
   * @param {String} unit - The current unit being used.
   * @returns {Number} - Returns the temperature value after conversion.
   */
  switchTempUnit = (value, unit) => {
    if (unit === "fahrenheit") return ((value * 9) / 5 + 32).toFixed(2);
    else return (((value - 32) * 5) / 9).toFixed(2);
  };

  /**
   * @description - Returns all the data for a particular day alone.
   * @param {Array} array - Array containing weather info of all dates.
   * @param {String} date - Date string of a particular date to filter.
   * @returns {Array} - Filtered array of a day.
   */
  getDateInfo = (array, date) => {
    let data = array.filter(
      (val) => moment(val.dt_txt).format("MM/DD/yy") === date
    );
    return data;
  };

  /**
   * @description - Calculates the temperature from Kelvin to the desired unit.
   * @param {Number} temp - Temperature value.
   * @param {String} unit - Unit to switch to for conversion.
   * @returns {Number} - Returns the converted temperature value.
   */
  getTemperature = (temp, unit) => {
    if (unit === "celsius") return (temp - 273.15).toFixed(2);
    else return (((temp - 273.15) * 9) / 5 + 32).toFixed(2);
  };

  /**
   * @description - Calculates the chart values for generation.
   * @param {Array} data - Array containing info for a particular day.
   */
  generateChart = (data) => {
    const { value } = this.state;
    let labels = data.map((item) =>
      moment(item.dt_txt).format("MM/DD/YYYY HH:mm:ss")
    );
    let temp = data.map((item) => this.getTemperature(item.main.temp, value));
    this.setState({
      bar_labels: labels,
      bar_values: temp,
    });
  };

  /**
   * @description - Renders the weather information page.
   * @returns {Node} - Html for weather page.
   */
  renderWeatherInfo = () => {
    const { value } = this.state;
    const { weatherData, classes } = this.props;
    return (
      <Fragment>
        <Container maxWidth="lg">
          <h1 style={{ textAlign: "center" }}>
            {weatherData.data.city !== undefined
              ? `Weather Report for ${weatherData.data.city.name}`
              : "Weather Report"}
          </h1>
          <div className={classes.fieldDiv}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Unit"
                name="unit"
                value={value}
                onChange={this.handleChange}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="celsius"
                      control={<Radio color="primary" />}
                      label="Celsius"
                      labelPlacement="end"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="fahrenheit"
                      control={<Radio color="primary" />}
                      label="Fahrenheit"
                      labelPlacement="end"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          </div>
          {this.renderCarousel()}
          {this.renderBarChart()}
        </Container>
      </Fragment>
    );
  };

  /**
   * @description - Renders the carousel div on page.
   * @returns {Node} - Html for carousel div.
   */
  renderCarousel = () => {
    const { value } = this.state;
    const { weatherData, classes } = this.props;
    const dates =
      weatherData.data.list !== undefined
        ? weatherData.data.list.map((val) =>
            moment(val.dt_txt).format("MM/DD/yy")
          )
        : [];
    const uniqueDates = [...new Set(dates)];
    const weatherDetails = uniqueDates.map((val) => {
      return {
        date: moment(val).format("MMM Do YYYY"),
        avg_temp: this.getAvgTemp(weatherData.data.list, val).toFixed(2),
        data: this.getDateInfo(weatherData.data.list, val),
      };
    });
    return (
      <Fragment>
        <div className={classes.carouselDiv}>
          <Grid container spacing={1}>
            <Carousel itemsToShow={3} itemsToScroll={3}>
              {weatherDetails.map((item, index) => (
                <Grid key={index} item xs={11}>
                  <Card className={classes.root} variant="outlined">
                    <CardContent className={classes.contentDiv}>
                      <Typography variant="h5" component="h2">
                        {item.date}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        Average Temperature in {value}:{" "}
                        {value === "celsius"
                          ? this.getTemperature(item.avg_temp, "celsius")
                          : this.getTemperature(item.avg_temp, "fahrenheit")}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.actionDiv}>
                      <Button
                        size="small"
                        onClick={() => this.generateChart(item.data)}
                      >
                        Click here for graphical analysis
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Carousel>
          </Grid>
        </div>
      </Fragment>
    );
  };

  /**
   * @description - Renders the barchart div on page.
   * @returns {Node} - Html for barchart div.
   */
  renderBarChart = () => {
    const { value, bar_labels, bar_values } = this.state;
    const { classes } = this.props;
    const data = {
      labels: bar_labels,
      datasets: [
        {
          label: `Temperature in ${value}`,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: bar_values,
        },
      ],
    };
    return (
      <Fragment>
        <div className={classes.barDiv}>
          {bar_labels.length !== 0 ? (
            <Bar
              data={data}
              options={{
                title: {
                  display: true,
                  text: `Temperatures for ${moment(bar_labels[0]).format(
                    "MMM Do YYYY"
                  )} in ${value}`,
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          ) : null}
        </div>
      </Fragment>
    );
  };

  /**
   * @description - Renders the weather details page.
   * @returns {Node} - Returns html.
   */
  render() {
    const { weatherData } = this.props;
    return (
      <Fragment>
        {weatherData.data.list !== undefined ? (
          this.renderWeatherInfo()
        ) : (
          <Loader />
        )}
      </Fragment>
    );
  }
}

/**
 * @description Map all form state to props.
 * @param {Object} state - State.
 * @returns {Object} - Props.
 */
function mapStateToProps(state) {
  return {
    weatherData: state.weatherDetailsReducer,
  };
}

WeatherDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

WeatherDetails.defaultProps = {};

export default injectSheet(styles)(connect(mapStateToProps)(WeatherDetails));
