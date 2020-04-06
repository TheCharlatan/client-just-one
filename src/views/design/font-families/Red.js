import styled from "styled-components";
import FontBasic from './FontBasic';

const Red = styled(FontBasic)`
color: #F40007;

mix-blend-mode: darken;
text-stroke: 2px #CD0003;
-webkit-text-stroke: 2px #CD0003;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default Red;