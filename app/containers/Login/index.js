import { connect } from "react-redux";

import { login } from "./actions";

import Login from "../../components/Login";
console.log("login", Login);

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoggingIn: state.auth.isLoggingIn
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(login(email, password))
});

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
