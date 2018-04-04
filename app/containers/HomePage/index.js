import { connect } from "react-redux";

import { logOut } from "containers/App/actions";

import HomePage from "components/HomePage";

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(logOut())
});

export default connect(null, mapDispatchToProps)(HomePage);
