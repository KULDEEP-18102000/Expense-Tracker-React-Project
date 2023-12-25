import { NavLink } from "react-router-dom/cjs/react-router-dom"

const WelcomePage=()=>{

    const idToken=localStorage.getItem('token')

    const sendEmailForVerification=async()=>{
        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBgisiq-vo6ATIrzPaLyCe3j876p8HEzVs',{
      method:'POST',
      body:JSON.stringify({
            idToken:idToken,
            requestType:"VERIFY_EMAIL"
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
       console.log(response)
       if(!response.ok){
        const res=await response.json()
        let errorMessage='Something Went Wrong'
        if(res && res.error && res.error.message){
            errorMessage=res.error.message
        }
        alert(errorMessage)
       }
    }

    return(
        <div>
            <h1>Welcome To Expense Tracker</h1>
            <h3>Your Profile is incomplete. <NavLink to="/profile">Complete Now</NavLink></h3>
            <div>
                <h3>Verify Your Email Address</h3>
                <button onClick={sendEmailForVerification}>Verify</button>
            </div>
        </div>
    )
}

export default WelcomePage