import { useState,useContext } from "react"
import expenseContext from "../store/expense-context"
import {useDispatch,useSelector} from 'react-redux'
import { ExpenseActions } from "../store/Expense"
import axios from "axios"

const ExpenseForm=()=>{

    const ctx=useContext(expenseContext)
    console.log(ctx)

    const dispatch=useDispatch()


    const [expense,setExpense]=useState({
        amount:0,
        description:"",
        category:"Food"
    })

    const addExpense=async(e)=>{
        e.preventDefault()
        console.log("expense",expense)
        // ctx.addExpense(expense)
        const response=await axios.post(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses.json`,expense)
       console.log(response)
        dispatch(ExpenseActions.addExpense(expense))
        setExpense({
          amount:0,
          description:"",
          category:"Food"
        })
    }

    const onChangeHandler=(e)=>{
        // e.preventDefault()
        console.log(e.target.value)
        setExpense({...expense,[e.target.name]:e.target.value})
    }


    return(
        <div className="container m-5">

            <form onSubmit={addExpense}>
  <div className="mb-3">
    <label for="exampleInputAmount1" class="form-label">Amount</label>
    <input type="number" class="form-control" id="exampleInputAmount1" name="amount" onChange={onChangeHandler} value={expense.amount}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputDescription1" class="form-label">Description</label>
    <input type="text" class="form-control" id="exampleInputDescription1" name="description" onChange={onChangeHandler} value={expense.description}/>
  </div>
  <div className="mb-3">
  <label for="exampleInputCategory1" class="form-label">Category</label>
  <select class="form-select" aria-label="Default select example" id="exampleInputCategory1" name="category" onChange={onChangeHandler} value={expense.category}>
  <option value="Food">Food</option>
  <option value="Petrol">Petrol</option>
  <option value="Salary">Salary</option>
</select>
</div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>


</div>
    )
}

export default ExpenseForm