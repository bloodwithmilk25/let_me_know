import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { sign_in, sign_out, fetchUser } from "../actions/auth";

class AuthForm extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.sign_in(formValues);
  };

  render() {
    if (!this.props.user.isSignedIn) {
      return (
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field name="email" component={this.renderInput} label="Email" />
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
          />
          <button className="ui button primary">Login</button>
        </form>
      );
    } else {
      return (
        <div>
          <h1>{this.props.user.email}</h1>;
          <button onClick={this.props.sign_out} className="ui button primary">
            Sign Out
          </button>
        </div>
      );
    }
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

const mapStateToProps = ({ user }) => {
  return { user };
};

// adding redux form
const formWrapperd = reduxForm({
  form: "auth",
  validate
})(AuthForm);

// and then adding connect
export default connect(
  mapStateToProps,
  { sign_in, sign_out, fetchUser }
)(formWrapperd);
