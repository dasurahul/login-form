import React from "react";

import { connect } from "react-redux";

import hideLoginForm from "../redux/login/login.action";
import Welcome from "./Welcome.component";

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }
  inputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submitHandler = (event) => {
    event.preventDefault();
    const emailRegex = RegExp();
    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/);
    if (
      emailRegex.test(this.state.email) &&
      passwordRegex.test(this.state.password)
    ) {
      const { hide } = this.props;
      hide();
    } else {
      alert("Enter Valid Details");
    }
  };
  render() {
    const { getState } = this.props;
    return (
      <>
        {getState && <Welcome name={this.state.name} />}
        {!getState && (
          <>
            <h1>Login Form</h1>
            <form onSubmit={this.submitHandler}>
              <input
                name="name"
                type="text"
                placeholder="Name"
                onChange={this.inputHandler}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={this.inputHandler}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={this.inputHandler}
              />
              <button>Login</button>
            </form>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getState: state.loginState.hidden,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hide: () => dispatch(hideLoginForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
