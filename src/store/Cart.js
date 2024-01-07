import { createSlice } from "@reduxjs/toolkit";

const initialCartStore={
    items:[],
    showCart:false
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
        }
    }
})

export const cartReducer=cartSlice.reducer
export const cartActions=cartSlice.actions