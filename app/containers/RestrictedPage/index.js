import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { makeSelectCurrentUser } from "containers/App/selectors";

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
const Container = BaseComponent => {
  class Restricted extends React.PureComponent {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      this.checkAuthentication(nextProps);
    }
    checkAuthentication({ currentUser, history }) {
      !currentUser && history.replace({ pathname: "/login" });
    }
    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  const mapStateToProps = createStructuredSelector({
    currentUser: makeSelectCurrentUser()
  });

  return withRouter(connect(mapStateToProps)(Restricted));
};

export default Container;
