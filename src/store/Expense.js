import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axios from "axios";

const fetchExpenses = createAsyncThunk("expense/fetchExpenses", async () => {
    try {
      const response = await axios.get("https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses.json");
      console.log(response)
      return response.data; // Assuming the API returns an array of expenses
    } catch (error) {
      throw error;
    }
  });

  const initialExpenseStore = {
    expenses: [],
    status: "idle", // or "loading", "succeeded", "failed"
    error: null,
  };

const ExpenseSlice=createSlice({
    name:'Expense',
    initialState:initialExpenseStore,
    reducers:{
        addExpense(state,action){
            // const response=await axios.post(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses.json`,expense)
    //    console.log(response)
        // setExpenses([...expenses,expense])
        state.expenses.push(action.payload)
        console.log(action)
        },
        deleteExpense(state,action){
            // const response=await axios.delete(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses/${deletedExpense.id}.json`)
    //    console.log(response)
       const updatedExpenses=state.expenses.filter((expense)=>{
        return expense.id!=action.payload.id
       })
    //    setExpenses(updatedExpenses)
    state.expenses=updatedExpenses
        },
        editExpense(state,action){
            // const response=await axios.put(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/expenses/${editExpense.id}.json`,editExpense)
    //    console.log(response)
       const updatedExpenses=[]
       for (let index = 0; index <state.expenses.length; index++) {
        const element = state.expenses[index];
        if(element.id==action.payload.id){
            element.amount=action.payload.amount
            element.description=action.payload.description
            element.category=action.payload.category
        }
        updatedExpenses.push(element)
       }
       console.log(updatedExpenses)
    //    setExpenses(updatedExpenses)
    state.expenses=updatedExpenses
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchExpenses.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchExpenses.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.expenses = action.payload;
          })
          .addCase(fetchExpenses.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
      },
})

export const ExpenseReducer=ExpenseSlice.reducer
export const ExpenseActions=ExpenseSlice.actions