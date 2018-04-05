import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

import ScreenTemplate from "components/templates/ScreenTemplate";
import H1 from "components/H1";
import Button from "components/Button";

// const ScreenTemplate = ({ children }) => {
//   console.log("ScreenTemplate", children);
//   return (
//     <div>
//       <section>{children}</section>
//     </div>
//   );
// };

const HomePage = ({ onLogOut, Footer }) => {
  return (
    <ScreenTemplate Footer={Footer}>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Home page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>Home Page</H1>
      <Button onClick={onLogOut}>Log Out</Button>
    </ScreenTemplate>
  );
};

HomePage.propTypes = {
  onLogOut: PropTypes.func.isRequired
};

export default HomePage;
