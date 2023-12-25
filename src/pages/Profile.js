import { useRef,useEffect,useState } from "react"
import axios from "axios"

const ProfilePage=()=>{

    const nameRef=useRef()
    const photoRef=useRef()

    const [profileName,setProfileName]=useState("")
    const [profileImage,setProfileImage]=useState("")

    const idToken=localStorage.getItem('token')

    useEffect(()=>{
        console.log(idToken)
        const fetchProfile=async()=>{
        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBgisiq-vo6ATIrzPaLyCe3j876p8HEzVs',{
      method:'POST',
      body:JSON.stringify({
            idToken:idToken
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const res=await response.json()
    console.log(res.users[0])
    setProfileName(res.users[0].displayName)
    setProfileImage(res.users[0].photoUrl)
          }
          fetchProfile()
    },[])

    const submitProfile=async(e)=>{
        e.preventDefault()
        console.log(nameRef.current.value)
        console.log(photoRef.current.value)

        const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBgisiq-vo6ATIrzPaLyCe3j876p8HEzVs',{
      method:'POST',
      body:JSON.stringify({
            idToken:idToken,
            displayName:nameRef.current.value,
            photoUrl:photoRef.current.value,
            returnSecureToken:true
      }),
      
      headers:{
        'Content-Type':'application/json'
      }
    })

       console.log(response)
    }

    return(
        <div className="container">
        <h1>Profile Details</h1>
        <form onSubmit={submitProfile}>
  <div class="mb-3">
    <label htmlFor="exampleInputName1" className="form-label">Full Name</label>
    <input type="text" class="form-control" id="exampleInputName1" aria-describedby="emailHelp" ref={nameRef} value={profileName}/>
  </div>
  <div class="mb-3">
    <label htmlFor="exampleInputPhoto1" className="form-label">Photo URL</label>
    <input type="file" class="form-control" id="exampleInputPhoto1" ref={photoRef}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        
        </div>
    )
}

export default ProfilePage