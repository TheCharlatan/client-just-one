import styled from "styled-components";
import FontBasic from "./FontBasic";

const Blue = styled(FontBasic)`
  color: #00a6ec;

  mix-blend-mode: darken;
  text-stroke: 2px #006aae;
  -webkit-text-stroke: 2px #006aae;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default Blue;
