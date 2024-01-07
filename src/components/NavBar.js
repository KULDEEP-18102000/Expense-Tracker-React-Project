import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { useContext } from "react"
import expenseContext from "../store/expense-context"
import { useDispatch } from 'react-redux';
import { authActions } from "../store/Auth";
import { useSelector } from 'react-redux';

const NavBar=()=>{

    const history=useHistory()

    const ctx=useContext(expenseContext)

    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)

    const dispatch=useDispatch()


    const logOut=()=>{
        // ctx.logOutHandler()
        dispatch(authActions.logOut())
        history.push('/auth')
    }

    return(
        <>

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        
        
        <li className="nav-item">
          <NavLink className="nav-link" to="/auth">Login</NavLink>
        </li>  
        
        <button onClick={logOut}>Logout</button>  
        
        
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}

export default NavBar