/*
 * FeaturePage
 *
 * List all the features
 */
import React from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";

import H1 from "components/H1";

export default class HomePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta
            name="description"
            content="Home page of React.js Boilerplate application"
          />
        </Helmet>
        <H1>Home Page</H1>
      </div>
    );
  }
}
