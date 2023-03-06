import {useState, useContext, useEffect} from "react"
import {LoginContext} from "./context.js"
import deleteButton from "./deleteButton.png"


function Help(){
    const {page, setPage} = useContext(LoginContext)
    return(
        <>
            <h1>Help</h1>
            <div className="margins">
                <h1>Need Help?</h1>
                <p>By clicking “About Us” you can see more information on what the purpose of this website is.</p><br/>

                <h3>Searching/Creating tests</h3>
                <p>Using the search bar you have the option of searching a test or you can create your own by clicking the “create a test” button underneath the search bar.</p><br/>
                <p> If you want to delete the latest slide, you can click on the trash icon.</p><br/>
                <img style={{"width":"5%"}} src = {deleteButton}></img>
                <p>The plus at the bottom of the slide that's being created represents adding another slide.</p><br/>

                <p>The “Post” button at the very bottom of the slide show prepares the set and lets you use the slide show to test and gives access to everyone else too!</p><br/>

                <h3>Creating Study Set</h3>
                <p>You will enter a question and answer choices into the slide and do the same to every other slide, once you have filled out the slides to your need you will click the create button allowing you to finally use the slide 🙂</p>
            </div>
            <button onClick={()=>{setPage("home")}}>Go back</button> 
        </>

    )
}

export default Help;