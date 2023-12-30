import expenseContext from "./expense-context"
import { useState } from "react"

const ExpenseProvider=(props)=>{

    const [expenses,setExpenses]=useState([])

    const addExpense=(expense)=>{
        console.log(expense)
        setExpenses([...expenses,expense])
    }
    
    return(
        <>
        <expenseContext.Provider value={{expenses,addExpense}}>
            {props.children}
        </expenseContext.Provider>
        </>
    )
}

export default ExpenseProvider