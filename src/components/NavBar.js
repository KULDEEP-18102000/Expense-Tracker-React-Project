import { useHistory } from "react-router-dom/cjs/react-router-dom"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { useContext } from "react"
import expenseContext from "../store/expense-context"
import { useDispatch } from 'react-redux';
import { authActions } from "../store/Auth";
import { ExpenseActions } from "../store/Expense";
import { useSelector } from 'react-redux';
import { ThemeActions } from "../store/Theme";

const NavBar=()=>{

    const history=useHistory()

    const ctx=useContext(expenseContext)

    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)

    const dispatch=useDispatch()

    const isDarkTheme=useSelector(state=>state.theme.isDarkTheme)
    console.log(isDarkTheme)

    const isThemeActivated=useSelector(state=>state.theme.isThemeActivated)


    const logOut=()=>{
        // ctx.logOutHandler()
        dispatch(authActions.logOut())
        dispatch(ExpenseActions.resetExpense())
        history.push('/auth')
    }

    const themeHandler=()=>{
      if(isDarkTheme==true){
        dispatch(ThemeActions.setLightTheme())
      }else{
        dispatch(ThemeActions.setDarkTheme())
      }
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

    {isThemeActivated && <button onClick={themeHandler}>{isDarkTheme?'set Light':'set Dark'}</button>}
    
  </div>
</nav>
        </>
    )
}

export default NavBar