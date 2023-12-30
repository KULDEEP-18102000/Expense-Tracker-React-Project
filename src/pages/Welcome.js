import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { useContext,useState } from "react"
import expenseContext from "../store/expense-context"
import ExpenseForm from "../components/ExpenseForm"
import ExpenseList from "../components/ExpenseList"

const WelcomePage=()=>{

    const ctx=useContext(expenseContext)
    console.log(ctx)

    const [expense,setExpense]=useState({
        amount:0,
        description:"",
        category:"Food"
    })

    const idToken=localStorage.getItem('token')

    const sendEmailForVerification=async()=>{
        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBgisiq-vo6ATIrzPaLyCe3j876p8HEzVs',{
      method:'POST',
      body:JSON.stringify({
            idToken:idToken,
            requestType:"VERIFY_EMAIL"
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
       console.log(response)
       if(!response.ok){
        const res=await response.json()
        let errorMessage='Something Went Wrong'
        if(res && res.error && res.error.message){
            errorMessage=res.error.message
        }
        alert(errorMessage)
       }
    }

    return(
        <div className="container">
            <h1>Welcome To Expense Tracker</h1>
            <h3>Your Profile is incomplete. <NavLink to="/profile">Complete Now</NavLink></h3>
            <div>
                <h3>Verify Your Email Address</h3>
                <button onClick={sendEmailForVerification}>Verify</button>
            </div>

            <div className="container m-5">

              <ExpenseForm/>
              <ExpenseList/>
              </div>
        </div>
    )
}

export default WelcomePage