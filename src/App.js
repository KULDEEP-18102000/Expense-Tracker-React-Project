import Counter from './components/Counter';
import { Fragment } from 'react';
import Header from './components/Header';
import Auth from './components/Auth'
import UserProfile from './components/UserProfile'
import { useSelector } from 'react-redux';


function App() {
  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)

  return (
    <Fragment>
      <Header/>
      {!isAuthenticated && <Auth/>}
      {isAuthenticated && <UserProfile/>}
      {/* <Auth/> */}
    <Counter />
    </Fragment>
  );
}

export default App;
