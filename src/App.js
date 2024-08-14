import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProfileSearch from './components/ProfileSearch';
import ProfileView from './components/ProfileView';
import Inbox from './components/Inbox';
//import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<ProfileSearch />} />
        <Route path="/profile/:profileId" component={ProfileView} />  
        <Route path="/inbox" element={<Inbox />} />
        </Switch>
    </Router>
  );
}

export default App;


