import React from "react"
import {Link} from "react-router-dom"

function Home(){
    return(
        <div>
            <Link to="/signup">
                Signup
            </Link>
            <Link to="/signin">
                SignIn
            </Link>
        </div>
    )
}


export default Home