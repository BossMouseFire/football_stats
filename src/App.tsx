import React from 'react';
import PageLeagues from './components/pageLeagues/pageLeagues'
import PageLeague from "./components/pageLeague/pageLeague";
import PageTeam from "./components/pageTeam/pageTeam";
import {Switch, Route, Redirect, HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";

const App:React.FC = () => {
  return(
      <Provider store={store}>
          <HashRouter basename={process.env.PUBLIC_URL}>
              <Switch>
                  <Route exact path={"/"} component={PageLeagues}/>
                  <Route path={"/league"} component={PageLeague}/>
                  <Route path={"/team"} component={PageTeam}/>
                  <Redirect to={"/"}/>
              </Switch>
          </HashRouter>
      </Provider>
  )
}

export default App;
