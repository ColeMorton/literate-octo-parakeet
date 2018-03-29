import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import Img from "components/Img";
import Login from "containers/Login";
import backgroundImage from "./home-keyvisual.jpg";
import logoImage from "./logo-white.svg";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImage});
  background-repeat: round;
`;

const Content = styled.div`
  height: 100%;
  margin: auto 10%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 15% auto auto;
  grid-row-gap: 40px;
`;

const Logo = styled(Img)`
  width: 100%;
  grid-column-start: 1;
  grid-row-start: 2;
`;

const LoginWrapper = styled.div`
  grid-column-start: 1;
  grid-row-start: 3;
`;

export default () => (
  <Wrapper>
    <Helmet>
      <title>Login Page</title>
      <meta name="description" content="Login page of Panorama application" />
    </Helmet>
    <Content>
      <Logo src={logoImage} alt="panorama logo" />
      <LoginWrapper>
        <Login />
      </LoginWrapper>
    </Content>
  </Wrapper>
);
