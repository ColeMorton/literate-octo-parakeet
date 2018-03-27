/*
 * FeaturePage
 *
 * List all the features
 */
import React from "react";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";

import QrReader from "react-qr-reader";

import H1 from "components/H1";
import QrCode from "components/QrCode";
import messages from "./messages";
import List from "./List";
import ListItem from "./ListItem";
import ListItemTitle from "./ListItemTitle";

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {}

  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>QR Code Page</title>
          <meta
            name="description"
            content="QR Code page of React.js Boilerplate application"
          />
        </Helmet>
        <QrCode />
      </div>
    );
  }
}
