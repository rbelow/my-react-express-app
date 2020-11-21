import React from "react";
import { connect } from "react-redux";

const LoginComponent = () => {
  return (
    <div>
      <h2>Please login</h2>
      <form>
        <input
          type="text"
          placeholder="username"
          name="username"
          defaultValue="Dev"
        ></input>
        <input
          type="password"
          placeholder="password"
          name="password"
          defaultValue=""
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => state;

export const ConnectedLogin = connect(mapStateToProps)(LoginComponent);
