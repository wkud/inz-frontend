import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { CategoryProvider } from './context/CategoryContext';
import Credits from './components/Credits';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import ExpenseList from './components/pages/ExpenseList';
import ExpenseForm from './components/pages/ExpenseForm';
import Categories from './components/pages/Categories';
import Limits from './components/pages/Limits';
import logo from './static/penny.png';
import 'bootstrap/dist/css/bootstrap.css';
import './style/App.css';

function App() {
  return (
    <Router>
      <CategoryProvider>
        <ExpenseProvider>
          <UserProvider>
            <div className='parent bg-light d-flex flex-column justify-content-between'>
              <Navigation logo={logo} />
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path='/home' component={Home} />
                  <Route exact path='/expense/list' component={ExpenseList} />
                  <Route exact path='/expense/form' component={ExpenseForm} />
                  <Route exact path='/category/list' component={Categories} />
                  <Route exact path='/category/form' component={Categories} />
                  <Route exact path='/limit/list' component={Limits} />
                  <Route exact path='/limit/form' component={Limits} />
                  <Route component={Home} />
                </Switch>
              </Suspense>
              <Credits />
            </div>
          </UserProvider>
        </ExpenseProvider>
      </CategoryProvider>
    </Router>
  );
}

export default App;
