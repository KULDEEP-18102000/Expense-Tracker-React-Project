import { useState, useRef,useContext } from 'react';

import classes from './AuthForm.module.css';



const AuthForm = () => {

//   const ctx=useContext(CartContext)

  
  const [user,setUser]=useState({
    returnSecureToken:true,
    email:"",
    password:"",
    confirmPassword:""
  })

  const [loading,setLoading]=useState(false)


  const addUser=async(e)=>{

    if(user.password!=user.confirmPassword){
        alert('Password and Confirm Password are not same')
    }else{

        setLoading(true)
    e.preventDefault()
    console.log(user)
    
    const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgisiq-vo6ATIrzPaLyCe3j876p8HEzVs',{
      method:'POST',
      body:JSON.stringify({
        email:user.email,
        password:user.password,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })

    if(!response.ok){
      const res=await response.json()
      setLoading(false)

      console.log(res)
      let errorMessage="Something Went Wrong"
      if(res && res.error && res.error.message){
        errorMessage=res.error.message
      }
      alert(errorMessage);
    }
    
    
    
    
    
    
    console.log("User has been successfully signed in")
    setLoading(false)
    setUser({email:"",password:"",returnSecureToken:true})
    }

    
  }

  const onChangeHandler=(e)=>{
    e.preventDefault()
    setUser({...user,[e.target.name]:e.target.value})
  }

  return (
    <section className={classes.auth}>
      <h1>Sign Up</h1>
      <form onSubmit={addUser}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' name='email' value={user.email} onChange={onChangeHandler} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={user.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className={classes.actions}>
          
            
          {loading===true?<p style={{color:'white'}}>Sending Request...</p>:<button style={{margin:'2px'}}>Sign Up</button>}
          
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
