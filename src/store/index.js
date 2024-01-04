import { createStore } from 'redux';
import { createSlice,configureStore } from '@reduxjs/toolkit';

// const counterReducer=(state={counter:0},action)=>{
//     if(action.type==='increment'){
//         return {
//             counter:state.counter+1
//         }
//     }
//     if(action.type=='decrement'){
//         return{
//             counter:state.counter-1
//         }
//     }
//     if(action.type=='incrementBy2'){
//         return{
//             counter:state.counter+action.amount
//         }
//     }
//     if(action.type=='incrementBy5'){
//         return{
//             counter:state.counter+action.amount
//         }
//     }
//     if(action.type=='decrementBy2'){
//         return{
//             counter:state.counter-2
//         }
//     }
//     if(action.type=='decrementBy5'){
//         return{
//             counter:state.counter-5
//         }
//     }
//     return state
// }

// const store=createStore(counterReducer)

// const counterSubscribe=()=>{
//     const state=store.getState()
//     console.log(state)
// }

// store.subscribe(counterSubscribe)

const initialCounterState={counter:0,showCounter:true}

const counterSlice=createSlice({
    name:'counter',
    initialState:initialCounterState,
    reducers:{
        increment(state){
            state.counter++
        },
        decrement(state){
            state.counter--
        },
        increase(state,action){
            state.counter=state.counter+action.payload
        },
        toggleCounter(state){
            state.showCounter=!state.showCounter
        }
    }
})

const initialAuthStore={
    isAuthenticated:false
}

const authSlice=createSlice({
    name:"Authentication",
    initialState:initialAuthStore,
    reducers:{
        login(state){
            console.log("auth come")
            state.isAuthenticated=true
        },
        logOut(state){
            state.isAuthenticated=false
        }
    }
})

// const store=configureStore({
//     reducer:counterSlice.reducer
// })

const store=configureStore({
    reducer:{counter:counterSlice.reducer,auth:authSlice.reducer}
})

export const counterActions=counterSlice.actions
export const authActions=authSlice.actions

export default store