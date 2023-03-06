import {useState, useContext, useEffect} from "react"
import Axios from 'axios';
import {LoginContext} from "./context.js";

function Test(props){
    const {page, setPage} = useContext(LoginContext)
    const [testInfo, setTestInfo] = useState([])
    const [page2, setPage2] = useState(1)
    const [score, setScore] = useState(0)
    const [correct, setCorrect] = useState()
    const [show, setShow] = useState(false)


    function shuffle(array) {
        let currentIndex = array.length
        let randomIndex;
      
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    useEffect(()=>{
        Axios.post("http://localhost:3004/getTestInfo", {testId: props.test.testId}).then((response)=>{
            setTestInfo(shuffle(response.data))
        })
    }, [])

    const checkAnswer = (val)=>{
        if (!show){
            if (val.correct){
                setCorrect("Correct")
                setShow(true)
                setScore((score)=>{return(score+1)})
            }
            else{
                setCorrect("Wrong")
                setShow(true)
            }
        }
    }

    return(
        <>
            <h1>{props.test.title}</h1>
            <h2>Test ID: {props.test.testId}</h2>
            <div className="title">
                {testInfo.length >= page2 && <div className="slides" style={{"width":"50%", "padding":"50px"}}>
                    {testInfo.length > 1 && <button onClick={()=>{setPage2((page2)=>{return(page2+1)}); setShow(false); setCorrect()}} style={{"float":"right"}}>Next</button>} 
                    <h3 style={{"margin":"50px"}}>{testInfo[page2-1].question}</h3> 
                    <p>{correct}</p>
                    <div className="flexCol">
                        {testInfo[page2-1].answers.map((val, index)=>{
                            return(
                                <>
                                    {show && val.correct ? <div className="answerSlide" style={{"backgroundColor":"green"}} onClick={()=>{checkAnswer(val)}}>{val.answer}</div>: <></>}
                                    {show && !val.correct && <div className="answerSlide" style={{"backgroundColor":"red"}}  onClick={()=>{checkAnswer(val)}}>{val.answer}</div>}
                                    {!show && <div className="answerSlide" onClick={()=>{checkAnswer(val)}}>{val.answer}</div>}

                                </>
                            )
                        })}
                    </div>
                </div>}
            </div>
            {page2 > testInfo.length && <h4>Score {score}/ {testInfo.length}</h4>}
            <br/>
            <button onClick={()=>{setPage("home")}}>Home</button>
        </>

    )
}

export default Test;