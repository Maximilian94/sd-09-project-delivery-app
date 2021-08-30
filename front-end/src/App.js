import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Customer from "./pages/Customer";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/customer/products" component={Customer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
