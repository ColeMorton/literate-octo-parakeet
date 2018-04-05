import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.footer`
  position: absolute;
  bottom: 0;
  font-size: 22pt;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #9a53dc;
`;

const IconButton = styled(Link)`
  flex-grow: 1;
  text-align: center;
  height: 60px;
  text-decoration: inherit;
  color: white;
`;

const Icon = styled.i`
  vertical-align: middle;
`;

function Footer({ onButtonClick }) {
  return (
    <Wrapper>
      <IconButton to="/" onClick={onButtonClick}>
        <Icon className="icon-home icons" />
      </IconButton>
      <IconButton to="/" onClick={onButtonClick}>
        <Icon className="icon-compass icons" />
      </IconButton>
      <IconButton to="/qrcode" onClick={onButtonClick}>
        <Icon className="icon-frame icons" />
      </IconButton>
      <IconButton to="/" onClick={onButtonClick}>
        <Icon className="icon-heart icons" />
      </IconButton>
      <IconButton to="/" onClick={onButtonClick}>
        <Icon className="icon-user icons" />
      </IconButton>
    </Wrapper>
  );
}

Footer.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default Footer;
