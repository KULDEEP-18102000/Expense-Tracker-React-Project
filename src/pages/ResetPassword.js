import { useRef,useState } from "react"


const ResetPassword=()=>{

    const emailRef=useRef()

    const [loading,setLoading]=useState(false)

    const ResetPassword=async(e)=>{
        console.log("reset password")
        e.preventDefault()
        setLoading(true)

        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBgisiq-vo6ATIrzPaLyCe3j876p8HEzVs',{
      method:'POST',
      body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:emailRef.current.value
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })

    setLoading(false)
       console.log(response)
    }

    const load=()=>{
      setLoading(true)
    }

    return(
        <div className="container m-5">
        <form onSubmit={ResetPassword}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailRef}/>
  </div>

<button onClick={load}>Load</button>
  {/* {loading==true && <p>Sending</p>} */}

  {loading==true ? <p>...Sending Request</p>: <button type="submit" class="btn btn-primary">Reset</button>}
  {/* {loading==true ? <p>...Sending</p>: <p class="btn btn-primary">Reset</p>} */}
  
</form>
</div>
    )
}

export default ResetPassword