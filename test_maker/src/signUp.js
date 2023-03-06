import {useState, useContext} from "react"
import Axios from 'axios';
import {LoginContext} from "./context.js"

function SignUp(){
    const {setPage, userId, setUserId} = useContext(LoginContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const signUp = (e)=>{
        e.preventDefault()
        Axios.post("http://localhost:3004/signUp", {email: email, password: password}).then((response)=>{
            if (response.data == "email taken"){
                alert("Email taken")
            }
            else{
                setPage("home")
                setUserId(response.data[0])
            }
        })
    }

    return(
        <>
            <h1>Sign up</h1>
            <form onSubmit={signUp}>
                <input type = "email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="normalInput"/>
                <br/>
                <input type = "password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="normalInput"/>
                <br/>
                <button type="submit">Sign up</button>
            </form>
            <p onClick={()=>{setPage("login")}} className="link">Login if you already have an account</p>
        </>
        
    )
}

export default SignUp;
