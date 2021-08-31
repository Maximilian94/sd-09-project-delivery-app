import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { LoginProvider } from './context/loginContext';
import Login from './pages/Login';
//  import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <LoginProvider>
      <div className="App">
        <Switch>
          <Route path="/customer/products" component={ Login } />
          <Route path="/login" component={ Login } />
          <Route
            exact
            path="/"
            render={ () => (<Redirect to="/login" />) }
          />
        </Switch>

        {/* <span className="logo">TRYBE</span>
        <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
          Glass
        </object> */}
      </div>
    </LoginProvider>
  );
}

export default App;
