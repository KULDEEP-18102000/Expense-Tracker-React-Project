import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialCartStore={
    items:[],
    showCart:false,
    loading:false,
    isError:false,
    success:false,
    isInitialCart:false
}

const cartSlice=createSlice({
    name:'Cart',
    initialState:initialCartStore,
    reducers:{
        addToCart(state,action){
            let flag=false
            for (let index = 0; index < state.items.length; index++) {
                const element = state.items[index];
                if(element.title==action.payload.title){
                    element.quantity=element.quantity+1
                    element.total=element.total+action.payload.price
                    flag=true
                }
            }
            if(flag==false){
                state.items.push(action.payload)
            }
        },
        setCartItems(state,action){
            state.isInitialCart=true
            // console.log(state.)
            state.items=action.payload
            console.log("make initial true")
        },
        setInitialCart(state){
            state.isInitialCart=!state.isInitialCart
            console.log("finally false")
        },
        increaseQuantity(state,action){
            state.items.forEach((item)=>{
                if(item.title==action.payload.title){
                    item.quantity=item.quantity+1
                    item.total=item.total+action.payload.price
                }
            })
        },
        decreaseQuantity(state,action){
            state.items.forEach((item)=>{
                if(item.title==action.payload.title){
                    if(item.quantity==1){
                        state.items=state.items.filter((element)=>{
                            return element.title!=item.title
                        })
                    }else{
                        item.quantity=item.quantity-1
                        item.total=item.total-action.payload.price
                    }
                }
            })
        },
        showCart(state){
            state.showCart=true
        },
        hideCart(state){
            state.showCart=false
        },
        toggleCart(state){
            state.showCart=!state.showCart
        },
        setLoading(state){
            state.loading=!state.loading
        },
        setError(state){
            state.isError=!state.isError
        },
        setSuccess(state){
            state.success=!state.success
        }
    }
})


export const sendCartData=(cartData)=>{
    // console.log("came to sendcartdata")
    return async(dispatch)=>{

        const sendRequest=async()=>{
            const response=await fetch(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/cart.json`,{
      method:'PUT',
      body:JSON.stringify(cartData)
    })
    // const response=await axios.post(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/cart.json`,expense)
    if(!response.ok){
        throw Error('error')
    }
        }
        dispatch(cartActions.setLoading())
        try {
            await sendRequest()
            console.log("try")
            dispatch(cartActions.setLoading())
            dispatch(cartActions.setSuccess())
            setTimeout(()=>{
                dispatch(cartActions.setSuccess())
            },2000)
        } catch (error) {
            console.log("catch")
            dispatch(cartActions.setLoading())
            dispatch(cartActions.setError())
            setTimeout(()=>{
                dispatch(cartActions.setError())
            },2000)
        }
    }
}

export const getCartData=()=>{

    return async(dispatch)=>{
    //     const response=await fetch(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/cart.json`,{
    //     method:'GET'
    //   })

      const response=await axios.get(`https://expense-tracker-fdf40-default-rtdb.firebaseio.com/cart.json`)

      console.log(response)

      console.log("seeting initial cart items")
      dispatch(cartActions.setCartItems(response.data))
    }
    
}

export const cartReducer=cartSlice.reducer
export const cartActions=cartSlice.actions