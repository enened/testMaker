import { useState} from 'react';
import Home from './homePage.js';
import {LoginContext} from "./context.js"
import Test from "./test.js"
import AboutUs from "./aboutUs"
import Faq from './faq.js';
import Login from "./login.js"
import SignUp from "./signUp.js"
import CreateTest from "./createTest.js"
import Help from "./help.js"

function App() {
  const [page, setPage] = useState('login')
  const [test, setTest] = useState()
  const [userId, setUserId] = useState()

  return(
    <LoginContext.Provider value={{ page, setPage, test, setTest, userId, setUserId}}>
      {page == "login" && <Login/>}
      {page == "help" && <Help/>}
      {page == "signUp" && <SignUp/>}
      {page == "test" && <Test test = {test}/>}
      {page == "home" && <Home/>}
      {page == "about" && <AboutUs/>}
      {page == "extra" && <Faq/>}
      {page == "createTest" && <CreateTest/>}
    </LoginContext.Provider>
  )

}

export default App;
