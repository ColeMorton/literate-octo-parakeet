import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { makeSelectCurrentUser } from "containers/App/selectors";
import Login from "containers/Login";
import LoginPage from "components/LoginPage";

class Container extends React.Component {
  componentWillMount() {
    this.checkAuthentication(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.checkAuthentication(this.props);
  }
  checkAuthentication({ currentUser, history }) {
    if (currentUser) history.replace({ pathname: "/" });
  }

  render() {
    return <LoginPage Login={Login} />;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser()
});

export default connect(mapStateToProps)(Container);
