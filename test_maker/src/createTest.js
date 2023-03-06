import {useState, useContext} from "react"
import Axios from 'axios';
import {LoginContext} from "./context.js"
import deleteButton from "./deleteButton.png"

function CreateTest(){
    const {page, setPage, setTest, userId} = useContext(LoginContext)
    const [title, setTitle] = useState()
    const [slides, setSlides] = useState([{answers: [{answer: null, correct: false}, {answer: null, correct: false}, {answer: null, correct: false}, {answer: null, correct: false}]}])


    const create = (e)=>{
        e.preventDefault()
        var ok = true
        for (let i = 0; i < slides.length; i++) {
            var answer = false;
            if (slides[i].question.trim().length == 0){
                alert("Please enter a proper question for slide " +(i+1))
                ok = false
            }
            for (let x = 0; x < slides[i].answers.length; x++) {
                if (slides[i].answers[x].correct && slides[i].answers[x].answer){
                    answer = true
                }
            }
            if (!answer){
                alert("Please choose a proper correct answer for question " + (i+1))
                ok = false
            }
        }
        if (ok){
            Axios.post("http://localhost:3004/createTest", {title: title, slides: slides, userId: userId}).then((response)=>{
                if (response.data == "ok"){
                    alert("Succesfully posted!")
                }
            })
        }
    }


    const removeSlide = (index)=>{
        let tempSlide = [...slides]
        tempSlide.splice(index, 1)
        setSlides(tempSlide)
    }

    const getQuestion = (index, question)=>{
        let tempSlide = [...slides]
        tempSlide[index].question = question
        setSlides(tempSlide)
    }

    const getAnswers = (index, num, choice)=>{
        let tempSlide = [...slides]
        tempSlide[index].answers[num-1].answer = choice
        setSlides(tempSlide)
    }

    const getCorrectAnswer = (index, num, e)=>{
        let tempSlide = [...slides]
        tempSlide[index].answers[num-1].correct = e.target.checked
        setSlides(tempSlide)
    }

    return(
        <>
            <h1>Create test</h1>
            <form onSubmit={create}>
                <input required type="text" onChange={(e)=>{setTitle(e.target.value)}} placeholder="Title" className="normalInput"/>
                <div className="title" style={{"flexDirection":"column"}}>
                    {slides.map((val, index)=>{
                        return(
                            <>
                                <div className="title">
                                    <div className="slides">
                                        <input type="text" placeholder="Question" onChange={(e)=>(getQuestion(index, e.target.value))} required className="normalInput" style={{"width":"50%"}}/>
                                        {slides.length-1 == index &&  slides.length > 1 && <img style={{"width":"5%"}} src = {deleteButton} onClick={()=>{removeSlide(index)}}/>}
                                        <br/>
                                        <input type="checkbox" onChange={(e)=>(getCorrectAnswer(index, 1, e))}/>
                                        <input type="text" placeholder="Choice" onChange={(e)=>(getAnswers(index, 1, e.target.value))} className="normalInput"/>
                                        <input type="checkbox" onChange={(e)=>(getCorrectAnswer(index, 2, e))}/>
                                        <input type="text" placeholder="Choice" onChange={(e)=>(getAnswers(index, 2,  e.target.value))} className="normalInput"/>
                                        <br/>
                                        <input type="checkbox" onChange={(e)=>(getCorrectAnswer(index, 3, e))}/>
                                        <input type="text" placeholder="Choice" onChange={(e)=>(getAnswers(index, 3,  e.target.value))} className="normalInput"/>
                                        <input type="checkbox" onChange={(e)=>(getCorrectAnswer(index, 4, e))}/>
                                        <input type="text" placeholder="Choice" onChange={(e)=>(getAnswers(index, 4,  e.target.value))} className="normalInput"/>
                                    </div>
                                </div>
                            </>

                        )
                    })}
                    <button style={{"width":"3%"}} onClick={()=>{setSlides([...slides, {answers: [{answer: null, correct: false}, {answer: null, correct: false}, {answer: null, correct: false}, {answer: null, correct: false}]}])}}>+</button>
                </div>   
                <button type="submit">Post</button>
            </form>
            <button onClick={()=>{setPage("home")}}>Go back</button>
        </>
        
    )
}

export default CreateTest;
