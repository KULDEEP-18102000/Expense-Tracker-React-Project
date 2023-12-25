import { NavLink } from "react-router-dom/cjs/react-router-dom"

const WelcomePage=()=>{

    return(
        <div>
            <h1>Welcome To Expense Tracker</h1>
            <h3>Your Profile is incomplete. <NavLink to="/profile">Complete Now</NavLink></h3>
        </div>
    )
}

export default WelcomePage