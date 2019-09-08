import React, {useEffect} from 'react';
import '../src/style/App.css';
import '../src/style/Navbar.css';
import '../src/style/Login.css';
import '../src/style/Spinner.css';
import Home from '../src/components/layout/Home';
import Login from './components/auth/Login';
import About from '../src/components/layout/About';
import Resume from '../src/components/layout/Resume';
import Course from '../src/components/layout/Course';
import Project from '../src/components/layout/Project';
import Github from '../src/components/layout/Github';
import Navbar from '../src/components/layout/Navbar';
import Internship from '../src/components/layout/Internship';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Store from './store';
import {Provider} from 'react-redux';
import setAuthToken from './utility/setAuthToken';
import {loadUser} from './actions/auth';


if (localStorage.token){ //set the default token or it won't work
  setAuthToken(localStorage.token)
}



function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={Store}>
      <Router>
      <Navbar/>
          <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/about' component={About}/>
              <Route exact path='/resume' component={Resume}/>
              <Route exact path='/course' component={Course}/>
              <Route exact path='/project' component={Project}/>
              <Route exact path='/github' component={Github}/>
              <Route exact path='/internship' component={Internship}/>
          </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
