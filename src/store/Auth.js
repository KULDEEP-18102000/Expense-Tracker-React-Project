import { createSlice } from "@reduxjs/toolkit";

const initialAuthStore={
    isAuthenticated:!!localStorage.getItem('token'),
    token:null,
    userId:null
}

const authSlice=createSlice({
    name:'Authentication',
    initialState:initialAuthStore,
    reducers:{
        login(state,action){
            console.log(state)
            localStorage.setItem('token',action.payload.token)
        setTimeout(()=>{
            console.log("settomeoutcalled")
            localStorage.clear('token')
        },300000)
        state.token=action.payload.token
        state.isAuthenticated=true
        state.userId=action.payload.userId
        console.log(state)
        },
        logOut(state){
            localStorage.clear('token')
            state.token=null
            state.isAuthenticated=false
            state.userId=null
        }
    }
})

export const authReducer=authSlice.reducer
export const authActions=authSlice.actions