# Just One Client

Just One Client (JOC) is a client for the multiplayer game Just One. It is written to work with a server, for which the source code can be found [here](https://github.com/SOPRA-2020/server-just-one).
JOC is designed as a Single Page Application (SPA) and provides an intuitive and colorful web interface to play the game, as well as use associated functionalities, such as chatting with other users and use lobbies.

## Technologies

JOC uses the JS-based [Node.js](https://nodejs.org/en/) runtime together with [React](https://reactjs.org/) for it's user interface.
It's SPA functiuonality is implemented using [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start).
With [styled-components](https://www.styled-components.com/docs) styled React components are created directly from styles.

## High-Level Components

JOC is highly modular, using reusable, periodically self-updating React components to implement it's functionality. The most important ones are:
* [AppRouter](https://github.com/SOPRA-2020/client-just-one/blob/master/src/components/shared/routers/AppRouter.js)<br>
Handles the routing of the application. Ensures that only logged in players can use it, and handles transition between different parts of the app.
* [Mainpage](https://github.com/SOPRA-2020/client-just-one/blob/master/src/components/mainpage/MainPage.js)<br>
The Mainpage component ties together many other components (like Chat, Leaderboard, ...). From here, users can navigate to other pages and use most of the site's community features.
* [Lobby](https://github.com/SOPRA-2020/client-just-one/blob/master/src/components/lobby/Lobby.js)<br>
Before joining a game, at least 3 users have to join a lobby. Also provides functionality for inviting players and chatting.
* [Chat](https://github.com/SOPRA-2020/client-just-one/blob/master/src/components/chat/Chat.js)<br>
Responsible for UI and communication with the server for chat components. Gets used by the mainpage and lobby components. Can work with separate endpoints.
* [Game](https://github.com/SOPRA-2020/client-just-one/blob/master/src/components/game/Game.js)<br>
The frontend engine of the game. Based on the current status retrieved, it sets the frontend status and communicates received information to the players. Makes use of many different components for the different game states.

## Launch & Deployment

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies including React get installed with:

### `npm install`

This has to be done before starting the application for the first time (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br>
Make sure to have an instance of the [server](https://github.com/SOPRA-2020/server-just-one) running.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

For remote deployment, after pushing a new commit to Github, Github Actions deploys the project to [Heroku](https://sopra-fs20-group-06-client.herokuapp.com) as defined in [deploy.yml](https://github.com/SOPRA-2020/client-just-one/blob/master/.github/workflows/deploy.yml).

## UI Flow

Placeholder


## Roadmap

We could do so much cool stuff!!!

## Authors & Acknowledgements

I did all the work, so thanks for that to me. I also thank me for being so supportive of myself, and also me for being always there for me <3

## License

Idc, just take ~~our~~ my code.