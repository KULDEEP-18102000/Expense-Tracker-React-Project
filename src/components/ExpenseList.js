import { useContext, useState } from "react"
import expenseContext from "../store/expense-context"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch,useSelector} from 'react-redux'
import { ExpenseActions } from "../store/Expense";
import axios from "axios";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ExpenseList=()=>{

    const [open, setOpen] = useState(false);
    const [editExpense,setEditExpense]=useState({
        amount:0,
        description:"",
        category:"Food"
    })

    const dispatch=useDispatch()

    const expenses=useSelector(state=>state.expense.expenses)
    console.log(expenses)

    let totalExpenseAmount=0
    for (let index = 0; index < expenses.length; index++) {
      const element = expenses[index];
      // console.log(element)
      totalExpenseAmount=totalExpenseAmount+parseInt(element.amount)
      // console.log(totalExpenseAmount)
    }
    console.log(totalExpenseAmount)

  const handleOpen = (expense) =>{
    setOpen(true);
    setEditExpense(expense)
  } 
  const handleClose = () => setOpen(false);

    const ctx=useContext(expenseContext)

    const DeleteExpenseHandler=async(expense)=>{
        // ctx.DeleteExpense(expense)
        const response=await axios.delete(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses/${expense.id}.json`)
       console.log(response)
        dispatch(ExpenseActions.deleteExpense(expense))
        console.log("Expense successfuly deleted")
    }

    const onChangeHandler=(e)=>{
        // e.preventDefault()
        console.log(e.target.value)
        setEditExpense({...editExpense,[e.target.name]:e.target.value})
    }

    const EditExpenseHandler=async(e)=>{
        e.preventDefault()
        console.log(editExpense)
        const response=await axios.put(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses/${editExpense.id}.json`,editExpense)
       console.log(response)
        dispatch(ExpenseActions.editExpense(editExpense))
        // ctx.editExpense(editExpense)
        setOpen(false)
    }



    return(
        <div className="container m-5">


{totalExpenseAmount>10000 && <button>Activate Premium</button>}
          
  <h4>List Of Expenses</h4>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Amount</th>
      <th scope="col">Description</th>
      <th scope="col">Category</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  {expenses.map((expense)=>
    // <li>{expense.amount}</li>
    <tr>
      <td>{expense.amount}</td>
      <td>{expense.description}</td>
      <td>{expense.category}</td>
      <td><button onClick={()=>handleOpen(expense)}>Edit</button></td>
      <td><button onClick={()=>DeleteExpenseHandler(expense)}>Delete</button></td>
    </tr>
)}
  </tbody>
</table>

<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Typography variant="h3" gutterBottom>
        Edit Expense
      </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount"
            value={editExpense.amount}
            name="amount"
            type="number"
            onChange={onChangeHandler}
            fullWidth
            variant="standard"
          />

<TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            value={editExpense.description}
            name="description"
            type="text"
            onChange={onChangeHandler}
            fullWidth
            variant="standard"
          />

<InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          name="category"
          value={editExpense.category}
          onChange={onChangeHandler}
        >
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Petrol"}>Petrol</MenuItem>
          <MenuItem value={"Salary"}>Salary</MenuItem>
        </Select>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={EditExpenseHandler}>Edit</Button>
        </DialogActions>
      </Dialog>

</div>
    )
}

export default ExpenseList