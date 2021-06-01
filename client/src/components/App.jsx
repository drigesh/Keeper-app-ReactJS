import React, { useState } from "react";
import Home from './Home';
import Custom from './Custom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div>

    <BrowserRouter>
      <Switch>

        <Route exact path='/' component={Home}>
          {/* <Home/> */}
        </Route>
        <Route path='/:custom' component={Custom}>
          
        </Route>

      </Switch>
    </BrowserRouter>

    </div>
  );
}

export default App;
