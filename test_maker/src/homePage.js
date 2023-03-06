import {useState, useContext, useEffect} from "react"
import Axios from 'axios';
import {LoginContext} from "./context.js"
import test from "./test.png"

function Home(){
    const {page, setPage, setTest, userId} = useContext(LoginContext)
    const [searchResult, setSearchResult] = useState("")
    const [tests, setTests] = useState([])

    const changeSearchResult = (e)=>{
        setSearchResult(e.target.value)
        if (e.target.value.trim().length > 0){
            Axios.post("http://localhost:3004/getTestBySearch", {searchResult: e.target.value}).then((response)=>{
                console.log(response)
                setTests(response.data)
            })
        }
        else{
            Axios.post("http://localhost:3004/getTests", {userId: userId}).then((response)=>{
                setTests(response.data)
            })
        }
        
    }

    useEffect(()=>{
        Axios.post("http://localhost:3004/getTests", {userId: userId}).then((response)=>{
            setTests(response.data)
        })
    }, [])


    return(
        <>
            <h1 className="title"><img src = {test} className="logo"/>   Home</h1>
            <input className="search" onChange = {changeSearchResult} type = "text" placeholder="Search for tests using the test title or test ID"/>

            <br/>
            <button onClick={()=>{setPage("createTest")}}>Create a test +</button>
            {searchResult.trim().length == 0 && <h2> Your tests</h2>}
            {tests.map((val)=>{
                return(
                    <>
                        <div className="tests" onClick={()=>{setPage("test"); setTest(val)}}>
                            <p>{val.title} </p>
                            <p>Test ID: {val.testId}</p>
                        </div>
                    </>
                )
            })}

            {tests.length == 0 && <p>No tests found</p>}


            <div className="extra">
                <button onClick={()=>{setPage("help")}}>Help</button>
                <button onClick={()=>{setPage("about")}}>About us</button>
                <button onClick={()=>{setPage("extra")}}>Extra resources</button>
                <button onClick={()=>{setPage("login")}}>Sign out</button>
            </div>
        </>
        
    )
}

export default Home;
