import React from 'react';
import PageLeagues from './components/pageLeagues/pageLeagues'
import PageLeague from "./components/pageLeague/pageLeague";
import PageTeam from "./components/pageTeam/pageTeam";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";

const App:React.FC = () => {
  return(
      <Provider store={store}>
          <BrowserRouter>
              <Switch>
                  <Route exact path={"/football_stats"} component={PageLeagues}/>
                  <Route path={"/football_stats/league"} component={PageLeague}/>
                  <Route path={"/football_stats/team"} component={PageTeam}/>
                  <Redirect to={"/"}/>
              </Switch>
          </BrowserRouter>
      </Provider>
  )
}

export default App;
