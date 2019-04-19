import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonFail: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red"
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class CircularIntegration extends React.Component {
  state = {
    loading: false,
    success: false,
    fail: false
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          this.timer = setTimeout(() => {
            this.setState({
              loading: false,
              success: true,
              fail: this.props.hasErrors()
            });
          }, this.props.delay);
        }
      );
    }
    this.props.onSubmit();
  };

  render() {
    const { loading, success, fail } = this.state;
    const { classes, style } = this.props;
    var buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });
    if (fail) {
      buttonClassname = classNames({
        [classes.buttonFail]: fail
      });
    }

    return (
      <div className={classes.root} style={style}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={buttonClassname}
            disabled={loading}
            onClick={this.handleButtonClick}
            style={{ margin: 0 }}
          >
            {this.props.buttonText}
          </Button>

          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

CircularIntegration.propTypes = {
  classes: PropTypes.object.isRequired
};

CircularIntegration.defaultProps = {
  delay: 1500,
  hasErrors: () => false
};

export default withStyles(styles)(CircularIntegration);
