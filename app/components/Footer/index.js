import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const Wrapper = styled.footer`
  position: absolute;
  bottom: 0;
  font-size: 22pt;
  color: white;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-width: thin;
  border-color: grey;
  border-top: solid;
  background-color: #9a53dc;
`;

const IconButton = styled.span`
  flex-grow: 1;
  text-align: center;
  height: 60px;
`;

const Icon = styled.i`
  vertical-align: middle;
`;

function Footer({ onButtonClick }) {
  return (
    <Wrapper>
      <IconButton onClick={onButtonClick}>
        <Icon className="icon-home icons" />
      </IconButton>
      <IconButton onClick={onButtonClick}>
        <Icon className="icon-compass icons" />
      </IconButton>
      <IconButton onClick={onButtonClick}>
        <Icon className="icon-frame icons" />
      </IconButton>
      <IconButton onClick={onButtonClick}>
        <Icon className="icon-heart icons" />
      </IconButton>
      <IconButton onClick={onButtonClick}>
        <Icon className="icon-user icons" />
      </IconButton>
    </Wrapper>
  );
}

Footer.propTypes = {
  onButtonClick: PropTypes.func.isRequired
};

export default Footer;
