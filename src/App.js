import logo from './logo.svg';
import './App.css';
import AuthForm from './components/Auth/AuthForm';
import WelcomePage from './pages/Welcome';
import ProfilePage from './pages/Profile';
import { Route,Redirect } from 'react-router-dom';
// import { Fragment } from 'react';

function App() {
  return (
    // <div>
    //   <AuthForm/>
    // </div>
    <>
    
    <Route exact path="/">
      <AuthForm/>
    </Route>
      
      <Route exact path='/welcome'>
        <WelcomePage/>
      </Route>

      <Route exact path='/profile'>
        <ProfilePage/>
      </Route>
      </>
  );
}

export default App;
