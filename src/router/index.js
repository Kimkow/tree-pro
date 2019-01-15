import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from '../pages/index/index';
import Others from '../pages/others';

const BasicRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index}/>
      <Route path="/others" component={Others}/>
    </Switch>
  </HashRouter>
);


export default BasicRoute;