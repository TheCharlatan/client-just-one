import styled from "styled-components";

/* the header is on top and contains for example the profile and logout button */
export const Header = styled.div`
grid-area: 1 / 1 / 2 / 6;
padding-left: 2px
padding-right: 2px
`;

/* the footer is on the bottom and contains for example the chat button and leaderboard sort button */
export const Footer = styled.div`
grid-area: 3 / 1 / 4 / 4;
padding-left: 2px
padding-right: 2px
`;


/*Th below stuff is from the template*/

/*
 * Using styled-components you can visual HTML primitives and use props with it!
 * The idea behind this external package, it's to have a better structure and overview for your HTML and CSS
 * Using styled-components, you can have styling conditions using the following syntax: ${props => ...}
 * https://www.styled-components.com/

const Container = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: bold;
  color: white;
  text-align: center;
`;
/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent

const Header = props => {
  return (
    <Container height={props.height}>

        <Yellow> The Sopranos present you Just One! (wip :P) </Yellow>

      <ReactLogo width={60} height={60} />
    </Container>
  );
};

/**
 * Don't forget to export your component!

export default Header;
*/