import axios from "axios";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setLoginSuccess } from "../store/actions/authAction";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== "" && password.trim() !== "") {
      let data = {
        username: username,
        password: password,
      };

      axios
        .post("http://localhost:3000/register", data)
        .then((res) => {
          // console.log(res);
          toast.success("Username created successfully");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 500) {
            toast.error("Username or password not found");
          } else {
            toast.error("Login failed");
          }
        });
    } else {
      toast.error("Email or Password cannot be empty");
    }
  };
  return (
    <div className="w-screen h-[80vh] flex  justify-center items-center">
      <Form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Register</h3>
        <div className="form-row">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="btn btn-block">
          Register
        </button>
      </Form>
      <div className="d-flex justify-content-center align-items-center">
        <span>Already have an account? Click here to login</span>
        <NavLink to="/login" className="btn ml-2">
          Login
        </NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  setLoginSuccess: (data) => dispatch(setLoginSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
