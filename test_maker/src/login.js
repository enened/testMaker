import {useState, useContext} from "react"
import Axios from 'axios';
import {LoginContext} from "./context.js"
import test from "./test.png"

function Login(){
    const {setPage, setUserId} = useContext(LoginContext)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const login = (e)=>{
        e.preventDefault()
        Axios.post("http://localhost:3004/login", {email: email, password: password}).then((response)=>{
            if (response.data == "no user"){
                alert("Email or password is inncorrect")
            }
            else{
                setUserId(response.data[0])
                setPage("home")
            }
        })
    }

    return(
        <>
            <div>
                <h1>Login</h1>
                <form onSubmit={login}>
                    <input type = "email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="normalInput"/>
                    <br/>
                    <input type = "password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="normalInput"/>
                    <br/>
                    <button type="submit">Login</button>
                </form>
                <p onClick={()=>{setPage("signUp")}} className="link">Sign up if you don't have an account</p>
            </div>

        </>
        
    )
}

export default Login;
