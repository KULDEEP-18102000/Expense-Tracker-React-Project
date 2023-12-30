import logo from './logo.svg';
import './App.css';
import AuthForm from './components/Auth/AuthForm';
import WelcomePage from './pages/Welcome';
import ProfilePage from './pages/Profile';
import NavBar from './components/NavBar';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/Home';
import { Route,Redirect } from 'react-router-dom';
import { useContext } from 'react';
import expenseContext from './store/expense-context';
// import { Fragment } from 'react';

const token=localStorage.getItem('token')

function App() {

  const ctx=useContext(expenseContext)

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
        {ctx.isLoggedIn && <WelcomePage/>}
        {!ctx.isLoggedIn && <Redirect to='/auth'/>}
        {/* <WelcomePage/> */}
      </Route>

      <Route exact path='/profile'>
        <ProfilePage/>
      </Route>

      <Route exact path='/reset-password'>
        <ResetPassword/>
      </Route>

      <Route exact path='/home'>
        {ctx.isLoggedIn && <HomePage/>}
        {!ctx.isLoggedIn && <Redirect to='/auth'/>}
        <HomePage/>
      </Route>
      </>
  );
}

export default App;
