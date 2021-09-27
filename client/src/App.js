import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import SignInSide from './components/EntrySignIn';
import Home from './components/Home';
import SignUp from './components/SignUp'
import { useUser } from './context/UserContext';

// import myMap from './components/Map';

const App = () => {

  const {userAuth} = useUser();

  return (
    <div className="App">
     
    <Router>
      <Switch>
        <Route exact path="/login" component={SignInSide}/>
        <Route exact path="/register" component={SignUp}/>
        <Route exact path="/home" component={()=><Home authorization={userAuth}/>}/>
      </Switch>
    </Router>

    </div>
  );
}

export default App;
