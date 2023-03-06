import {useState, useContext} from "react"
import {LoginContext} from "./context.js"

function Faq(){
    const {page, setPage} = useContext(LoginContext)

    return(
        <>
            <h1>Additional Resources</h1>
            <p>Including core classes and electives!</p>
            <div className="margins">
                <p><a href="https://quizlet.com/">Visit Quizlet!</a> Quizlet is a website which includes several ways to test yourself, such as matching definition and term, flashcards, and viewing other sets of slides done by other people to help learn or quiz yourself on a certain topic.</p>
                <p><a href="https://www.khanacademy.org/"> Visit KhanAcademy!</a> Khan Academy is a website which includes videos for almost every topic and explains things thoroughly. It also includes several practice tests which track your progress. Badges and points are given for what you have accomplished.</p>
                <p><a href="https://www.ixl.com/">Visit Ixl!</a> IXL is a website where there are several questions given and you must answer most of them correctly in order to get a smart score of 100. This website is used to test your knowledge on the topic you are learning since it gives you the question and you respond with the answer. It includes Math for all grades including Algebra 1, Algebra 2, Geometry, Pre-Calculus, and Calculus and several more. Other topics are available, such as Social Studie</p>
                <p><a href="https://www.collegeboard.org/">Visit College Board!</a> College Board is a website used for taking College tests such as the PSAT, SAT, ACT, and AP tests. When registered into the course it provides resources such as well explained videos and practice tests.</p>
                <p><a href="https://www.duolingo.com/">Visit Duolingo!</a> Duolingo is a website used to learn languages all across the world. It includes small progress checks and lessons to answer in that language you're learning.</p>
                <p><a href="https://tea.texas.gov/student-assessment/testing/staar/staar-released-test-questions">Visit the Texas Education Agency(TEA)!</a> Texas Education Agency(TEA) is a website which includes several resources to support a child's learning. These include released STAAR practices and AP resources. Since they also include the answers, you have access to seeing what you got right or wrong.</p>
                <p><a href="https://home.pearsonvue.com/Test-takers/Resources.aspx">Visit Pearson Vue!</a> Pearson Vue is a website that allows you to get certified for a certain test.</p>
                <p><a href="https://youtube.com/">Visit Youtube!</a> YouTube is a website where several videos about topics related to school, hobbies, and etc are located. They can be used for understanding new topics from different perspectives.</p>
                <p> <a href="https://certiport.pearsonvue.com/">Visit Certiport!</a> Certiport is a website where you can certify for technology and business related topics. They are also recognized world-wide.</p>
            </div>

            <button onClick={()=>{setPage("home")}}>Go back</button>
        </>

    )
}

export default Faq;