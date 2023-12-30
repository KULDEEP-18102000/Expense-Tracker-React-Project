import expenseContext from "./expense-context"
import { useState,useEffect } from "react"
import axios from "axios"

const ExpenseProvider=(props)=>{

    const [expenses,setExpenses]=useState([])

    const InitialToken=localStorage.getItem('token')

    const [token,setToken]=useState(InitialToken)

    const isLoggedIn=!!token

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
        expensesArray.push(obj)
       })
       console.log(expensesArray)
       setExpenses(expensesArray)
        }
        fetchExpenses()

    },[])

    const loginHandler=(token)=>{
        localStorage.setItem('token',token)
        setTimeout(()=>{
            console.log("settomeoutcalled")
            localStorage.clear('token')
        },300000)
        setToken(token)
    }

    const logOutHandler=()=>{
        localStorage.clear('token')
        setToken(null)
    }

    const addExpense=async(expense)=>{
        console.log(expense)
        const response=await axios.post(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses.json`,expense)
       console.log(response)
        setExpenses([...expenses,expense])
    }
    
    return(
        <>
        <expenseContext.Provider value={{expenses,addExpense,isLoggedIn,loginHandler,logOutHandler}}>
            {props.children}
        </expenseContext.Provider>
        </>
    )
}

export default ExpenseProvider