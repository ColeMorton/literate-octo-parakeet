import { connect } from "react-redux";

import { logOut } from "containers/App/actions";

import HomePage from "components/HomePage";
import Footer from "containers/Footer";

const mapStateToProps = () => ({
  Footer
});

const mapDispatchToProps = dispatch => ({
  onLogOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
