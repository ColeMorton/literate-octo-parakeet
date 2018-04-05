import React from "react";
import PropTypes from "prop-types";

const ScreenTemplate = ({ Header, children, Footer, ...props }) => (
  <div {...props}>
    {Header && <Header />}
    <section>{children}</section>
    {Footer && <Footer />}
  </div>
);

ScreenTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.any.isRequired
};

export default ScreenTemplate;
