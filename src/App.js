import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";

window.addEventListener("beforeunload", (ev) =>
{
    ev.preventDefault();
    return ev.returnValue = 'Are you sure you want to close?';

});

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <div>
        <AppRouter />
      </div>
    );
  }
}

export default App;
