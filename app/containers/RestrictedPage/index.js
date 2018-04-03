import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { makeSelectCurrentUser } from "containers/App/selectors";

/**
 * Higher-order component (HOC) to wrap restricted pages
 */
const Container = BaseComponent => {
  class Restricted extends React.Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }
    checkAuthentication(params) {
      const { currentUser, history } = params;
      if (!currentUser) history.replace({ pathname: "/login" });
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
