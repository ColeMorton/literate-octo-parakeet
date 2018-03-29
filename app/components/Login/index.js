import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import Input from "components/Input";
import Button from "components/Button";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 50px 50px 50px;
  grid-row-gap: 20px;
`;

const Email = styled(Input)`
  grid-column-start: 1;
  grid-row-start: 1;
`;

const Password = styled(Input)`
  grid-column-start: 1;
  grid-row-start: 2;
`;

const StyledButton = styled(Button)`
  grid-row-start: 3;
`;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "admin@example.com",
      password: "admin@example.com",
      isFormShown: false
    };
  }

  onLoginClick = () => {
    // const { isFormShown } = this.state;
    // if (!isFormShown) {
    //   this.setState({ isFormShown: true });
    // } else {
    //   const { email, password } = this.state;
    //   this.props.onLogin(email, password);
    // }

    const { email, password } = this.state;
    this.props.onLogin(email, password);
  };

  render() {
    const { isFormShown } = this.state;
    const { isLoggingIn } = this.props;
    const showForm = !isLoggingIn && isFormShown;
    const showButton = !isLoggingIn;
    const showSpinner = isLoggingIn;

    return (
      <Wrapper>
        <Email
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
        />
        <Password
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
        />
        <StyledButton onClick={this.onLoginClick}>Login</StyledButton>
      </Wrapper>
    );
  }
}

Login.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default Login;
