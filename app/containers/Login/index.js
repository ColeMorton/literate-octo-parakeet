import { connect } from "react-redux";

import { logInUser } from "containers/App/actions";

import Login from "components/Login";

const mapStateToProps = state => ({
  isLoggedIn: true,
  isLoggingIn: false
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(logInUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
