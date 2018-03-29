import { css } from "styled-components";

const buttonStyles = css`
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  background-color: #9a53dc;
  color: white;

  &:focus {
    outline: inherit;
  }
`;

export default buttonStyles;
