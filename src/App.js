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
import { useDispatch,useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { ExpenseActions } from './store/Expense';
import axios from 'axios';
import './style.css'
import { ThemeActions } from './store/Theme';

const token=localStorage.getItem('token')

function App() {

  const ctx=useContext(expenseContext)

  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)
  console.log(isAuthenticated)

  const totalExpenseAmount=useSelector(state=>state.expense.totalExpenseAmount)

  const isDarkTheme=useSelector(state=>state.theme.isDarkTheme)

  

  const dispatch=useDispatch()

  // console.log(totalExpenseAmount)
  //   if(totalExpenseAmount>10000){
  //     dispatch(ThemeActions.setThemeActivated())
  //   }else{
  //     dispatch(ThemeActions.setThemeDeactivated())
  //   }
  //   console.log()
  if(totalExpenseAmount<10000){
    dispatch(ThemeActions.setLightTheme())
    dispatch(ThemeActions.setThemeDeactivated())
  }

  useEffect(()=>{
    const fetchExpenses=async()=>{
        const response=await axios.get(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses.json`)
   console.log(response.data)
   const expensesArray=[]
   let ID_Array
   if(response.data){
    ID_Array=Object.keys(response.data)
   }
   
   ID_Array?.forEach((id)=>{
    const obj={
        id:id,
        amount:response.data[id].amount,
        description:response.data[id].description,
        category:response.data[id].category
    }
    dispatch(ExpenseActions.addExpense(obj))
    // expensesArray.push(obj)
   })
   console.log(expensesArray)
  //  setExpenses(expensesArray)
    }
    fetchExpenses()
    
},[])

  return (
    // <div>
    //   <AuthForm/>
    // </div>
    <div style={{
          backgroundColor: isDarkTheme ? '#121212' : '#ffffff',
          color: isDarkTheme ? '#ffffff' : '#333333'
        }}>
    <NavBar></NavBar>
    
    <Route exact path="/auth">
      <AuthForm/>
    </Route>
      
      <Route exact path='/'>
        {isAuthenticated && <WelcomePage/>}
        {!isAuthenticated && <Redirect to='/auth'/>}
        {/* <WelcomePage/> */}
      </Route>

      <Route exact path='/profile'>
        <ProfilePage/>
      </Route>

      <Route exact path='/reset-password'>
        <ResetPassword/>
      </Route>

      <Route exact path='/home'>
        {isAuthenticated && <HomePage/>}
        {!isAuthenticated && <Redirect to='/auth'/>}
        <HomePage/>
      </Route>
      </div>
  );
}

export default App;
