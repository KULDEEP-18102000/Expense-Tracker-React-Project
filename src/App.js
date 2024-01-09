import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';

function App() {

  const showCart=useSelector(state=>state.cart.showCart)
  const items=useSelector(state=>state.cart.items)
  const [loading,setLoading]=useState(false)
  const [isError,setError]=useState(false)
  const [success,setSuccess]=useState(false)


  useEffect(()=>{
    const fetchCartItems=async()=>{
      setLoading(true)
      const response=await fetch(`https://react-http-92046-default-rtdb.firebaseio.com/cart.json`,{
      method:'PUT',
      body:JSON.stringify(items)
    })
    setLoading(false)
    if(!response.ok){
      setError(true)
      setTimeout(()=>{
        setError(false)
      },2000)
    }else{
      setSuccess(true)
      setTimeout(()=>{
        setSuccess(false)
      },2000)
    }
    }
    if(items.length!==0){
      console.log(items)
      fetchCartItems()
    }
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
