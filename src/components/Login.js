import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  handleSubmit = e => {
    const { username, password } = this.state;
    e.preventDefault();
    e.persist();
    axios
      .post("https://insurance-risk-assesment.herokuapp.com/api/login", { username, password })
      .then(res => {
        console.log(res);
        localStorage.setItem("jwt", res.data.key);
        this.props.loginHandler(e);
        this.setState({ message: "Login successful" });
      })
      .then(() => this.props.history.push("/"))
      .catch(err => {
        console.log("login error", err.response.data.error);
        this.setState({ message: "Login failed" });
      });
  };

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="login-container">
        <form className="login" onSubmit={this.handleSubmit}>
          <h1>Risk Assessment</h1>
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.changeHandler}
            value={this.state.username}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.changeHandler}
            value={this.state.password}
            className="login-input"
          />
          <button className="form-button">Login</button>
          <p>testpassword</p>
          <Link className="rr-link " to="/register">
            <p>register</p>
          </Link>
          <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginPage);
