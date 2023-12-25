import logo from './logo.svg';
import './App.css';
import AuthForm from './components/Auth/AuthForm';
import WelcomePage from './pages/Welcome';
import ProfilePage from './pages/Profile';
import NavBar from './components/NavBar';
import { Route,Redirect } from 'react-router-dom';
// import { Fragment } from 'react';

const token=localStorage.getItem('token')

function App() {
  return (
    // <div>
    //   <AuthForm/>
    // </div>
    <>
    <NavBar></NavBar>
    
    <Route exact path="/auth">
      <AuthForm/>
    </Route>
      
      <Route exact path='/'>
        {token && <WelcomePage/>}
        {!token && <Redirect to='/auth'/>}
        {/* <WelcomePage/> */}
      </Route>

      <Route exact path='/profile'>
        <ProfilePage/>
      </Route>
      </>
  );
}

export default App;
