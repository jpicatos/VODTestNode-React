import React from "react";
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Menu from './components/Menu';
import Carrousel from './components/Carrousel';
import Video from './components/Video';


const App = () => (
  <Router>
      <div>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Carrousel} />
            <Route path="/:video" component={Video} />
        </Switch>
      </div>
  </Router>
);
render(<App/>, document.getElementById('app'));