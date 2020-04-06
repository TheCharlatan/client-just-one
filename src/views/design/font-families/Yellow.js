import styled from "styled-components";
import FontBasic from "./FontBasic";

const Yellow = styled(FontBasic)`
  color: #ffdb00;

  mix-blend-mode: darken;
  text-stroke: 2px #edaa2b;
  -webkit-text-stroke: 2px #edaa2b;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default Yellow;
