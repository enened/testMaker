import {useState, useContext} from "react"
import {LoginContext} from "./context.js"

function AboutUs(){
    const {page, setPage} = useContext(LoginContext)
    return(
        <>
            <h1>About us</h1>
            <div className="margins">
                <p>TestMaker, a website for students, is used to test their understanding on various topics. Though several individuals have studied through other websites and have reviewed their notes, not all their methods have proved effective. TestMaker allows the user to input his/her questions and answers to make their own test! Due to this, the user can see if he/she truly understands the material they're learning. They have the ability to see their progress, create study tests, the amount of questions they got right or wrong, and etc.</p>           
            </div>
            <button onClick={()=>{setPage("home")}}>Go back</button> 
        </>

    )
}

export default AboutUs;