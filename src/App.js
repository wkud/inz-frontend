import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { CategoryProvider } from './context/CategoryContext';
import { LimitProvider } from './context/LimitContext';
import Credits from './components/Credits';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import ExpenseList from './components/pages/ExpenseList';
import ExpenseForm from './components/pages/ExpenseForm';
import CategoryList from './components/pages/CategoryList';
import LimitList from './components/pages/LimitList';
import LimitForm from './components/pages/LimitForm';
import logo from './static/penny.png';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';

function App() {
  return (
    <Router>
      <CategoryProvider>
        <ExpenseProvider>
          <LimitProvider>
            <UserProvider>
              <div className='parent bg-light d-flex flex-column justify-content-between'>
                <Navigation logo={logo} />
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/expense/list' component={ExpenseList} />
                    <Route exact path='/expense/form' component={ExpenseForm} />
                    <Route
                      exact
                      path='/category/list'
                      component={CategoryList}
                    />
                    <Route exact path='/limit/list' component={LimitList} />
                    <Route exact path='/limit/form' component={LimitForm} />
                    <Route component={Home} />
                  </Switch>
                </Suspense>
                <Credits />
              </div>
            </UserProvider>
          </LimitProvider>
        </ExpenseProvider>
      </CategoryProvider>
    </Router>
  );
}

export default App;
