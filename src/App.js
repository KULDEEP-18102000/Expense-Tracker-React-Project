import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { sendCartData,getCartData, cartActions } from './store/Cart';

function App() {

  const dispatch=useDispatch()
  const showCart=useSelector(state=>state.cart.showCart)
  const items=useSelector(state=>state.cart.items)
  const loading =useSelector(state=>state.cart.loading)
  const isError=useSelector(state=>state.cart.isError)
  const success=useSelector(state=>state.cart.success)
  const isInitialCart=useSelector(state=>state.cart.isInitialCart)
  // const [loading,setLoading]=useState(false)
  // const [isError,setError]=useState(false)
  // const [success,setSuccess]=useState(false)
  const [isInitial,setIsInitial]=useState(true)
  // let isInitial=true


  useEffect(()=>{
    // const fetchCartItems=async()=>{

    //   // dispatch(sendCartData(items))

    //   setLoading(true)
    //   const response=await fetch(`https://react-http-92046-default-rtdb.firebaseio.com/cart.json`,{
    //   method:'PUT',
    //   body:JSON.stringify(items)
    // })
    // setLoading(false)
    // if(!response.ok){
    //   setError(true)
    //   setTimeout(()=>{
    //     setError(false)
    //   },2000)
    // }else{
    //   setSuccess(true)
    //   setTimeout(()=>{
    //     setSuccess(false)
    //   },2000)
    // }
    // }
    // console.log(isInitial)
    console.log(isInitialCart)
    if(isInitialCart==true){
      console.log(isInitialCart)
      dispatch(cartActions.setInitialCart())
      return
    }
    if(isInitial==true){
      // isInitial=false
      setIsInitial(false)
      dispatch(getCartData())
      return
    }
    // console.log(items)
    
    dispatch(sendCartData(items))
    // fetchCartItems()
  },[items])

  return (
    
    <Layout>
      {loading && <div class="alert alert-primary" role="alert">
  Sending data
</div>}
{
isError && <div class="alert alert-primary" role="alert">
Something went wrong
</div>
}
{
success && <div class="alert alert-primary" role="alert">
Successfully sent
</div>
}
      {showCart && <Cart />}
      
      <Products />
    </Layout>
  );
}

export default App;
