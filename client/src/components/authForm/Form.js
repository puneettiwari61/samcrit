import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userSignUp, userAuthProgress, userLogin } from "../../store/actions";
import "./form.scss";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      signUp: false,
      signInEmail: "",
      signInPassword: "",
      name: "",
      email: "",
      password: ""
    };
  }

  handleSignup = () => {
    this.setState({ signUp: true });
  };

  handleSignIn = () => {
    this.setState({ signUp: false });
  };

  handleSignInForm = e => {
    e.preventDefault();
    console.log(this.state, "from signin");
    this.props
      .dispatch(
        userLogin({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      )
      .then(data => {
        if (data.success) return this.props.history.push("/addevents");
      })
      .catch(err => {
        console.log(err, "login failed");
        this.props.dispatch(
          userAuthProgress({ isAuthInProgress: false, isAuthDone: false })
        );
      });
  };

  handleSignupForm = e => {
    e.preventDefault();
    console.log(this.state, "from signup");
    this.props
      .dispatch(
        userSignUp({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
      )
      .then(data => {
        if (data.success) return this.props.history.push("/addevents");
        if (data.err.errmsg.includes("duplicate"))
          console.log("username already exists");
      })
      .catch(err => {
        console.log(err, "signup failed");
        this.props.dispatch(
          userAuthProgress({ isAuthInProgress: false, isAuthDone: false })
        );
      });
  };

  render() {
    return (
      <>
        <div className="form-top">
          <div
            className={`container ${
              this.state.signUp ? "right-panel-active" : ""
            }`}
            id="container"
          >
            <div className="form-container sign-up-container">
              <form onSubmit={this.handleSignupForm}>
                <h1>Create Account</h1>
                <span>or use your email for registration</span>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.target.value });
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={this.state.password}
                  onChange={e => {
                    this.setState({ password: e.target.value });
                  }}
                />
                <button type="submit">Sign Up</button>
              </form>
            </div>
            <div className="form-container sign-in-container">
              <form onSubmit={this.handleSignInForm}>
                <h1>Sign in</h1>
                <span>or use your account</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={this.state.signInEmail}
                  onChange={e => {
                    this.setState({ signInEmail: e.target.value });
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={this.state.signInPassword}
                  onChange={e => {
                    this.setState({ signInPassword: e.target.value });
                  }}
                />
                <button type="submit">Sign In</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="welcome-head">Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={this.handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button
                    className="ghost"
                    id="signUp"
                    onClick={this.handleSignup}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapToProps({ user }) {
  console.log(user, "from map to props in auth page");
  return { user };
}
export default connect(mapToProps)(Form);
