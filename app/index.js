import React from "react";
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Menu from './components/Menu';
import Carrousel from './components/Carrousel';
import Video from './components/Video';
import History from './components/History';
import Login from './components/Login';
import Register from './components/Register';



const App = () => (
  <Router>
      <div>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Carrousel} />
            <Route path="/video/:video" component={Video} />
            <Route path="/login" component={Login} />
            <Route path="/history" component={History} />
            <Route path="/register" component={Register} />
        </Switch>
      </div>
  </Router>
);
render(<App/>, document.getElementById('app'));