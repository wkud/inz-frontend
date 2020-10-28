import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/user/UserContext';
import Credits from './components/Credits';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import Expenses from './components/pages/Expenses';
import Categories from './components/pages/Categories';
import Limits from './components/pages/Limits';
import logo from './static/penny.png';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className='parent bg-light d-flex flex-column justify-content-between'>
          <Navigation logo={logo} />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/home' component={Home} />
              <Route exact path='/expenses' component={Expenses} />
              <Route exact path='/categories' component={Categories} />
              <Route exact path='/limits' component={Limits} />
              <Route component={Home} />
            </Switch>
          </Suspense>
          <Credits />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
