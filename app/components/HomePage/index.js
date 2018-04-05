import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import H1 from "components/H1";
import Button from "components/Button";

const HomePage = ({ onLogOut, Footer }) => {
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
      <Button onClick={onLogOut}>Log Out</Button>
      <Footer />
    </div>
  );
};

HomePage.propTypes = {
  onLogOut: PropTypes.func.isRequired
};

export default HomePage;
