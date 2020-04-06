import styled from "styled-components";
import FontBasic from "./FontBasic";

const Orange = styled(FontBasic)`
  color: #ff9300;

  mix-blend-mode: darken;
  text-stroke: 2px #ff6a00;
  -webkit-text-stroke: 2px #ff6a00;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default Orange;
