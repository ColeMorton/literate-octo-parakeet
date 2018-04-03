/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import RestrictedPage from "containers/RestrictedPage";
import LoginPage from "containers/LoginPage/Loadable";
import HomePage from "containers/HomePage/Loadable";
import FeaturePage from "containers/FeaturePage/Loadable";
import QRCodePage from "containers/QRCodePage/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";
import Header from "components/Header";
import Footer from "components/Footer";

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={RestrictedPage(HomePage)} />
        <Route path="/login" component={LoginPage} />
        <Route path="/features" component={RestrictedPage(FeaturePage)} />
        <Route path="/qrcode" component={RestrictedPage(QRCodePage)} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/* <Footer /> */}
    </AppWrapper>
  );
}
