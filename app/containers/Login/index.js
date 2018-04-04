import { connect } from "react-redux";

import { logIn } from "containers/App/actions";

import Login from "components/Login";

const mapStateToProps = state => ({
  isLoggedIn: true,
  isLoggingIn: false
});

const mapDispatchToProps = dispatch => ({
  onLogIn: (email, password) => dispatch(logIn(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
