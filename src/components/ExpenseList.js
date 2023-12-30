import { useContext } from "react"
import expenseContext from "../store/expense-context"

const ExpenseList=()=>{

    const ctx=useContext(expenseContext)

    return(
        <div className="container m-5">
  <h4>List Of Expenses</h4>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Amount</th>
      <th scope="col">Description</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
  {ctx.expenses.map((expense)=>
    // <li>{expense.amount}</li>
    <tr>
      <td>{expense.amount}</td>
      <td>{expense.description}</td>
      <td>{expense.category}</td>
    </tr>
)}
  </tbody>
</table>
</div>
    )
}

export default ExpenseList