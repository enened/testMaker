const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user:  process.env.DB_USER,
  password:  process.env.DB_PASSWORD,
  database: 'test_maker'
});

app.listen(3004, ()=> {console.log(`Server started on port 3004`)});
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text());
app.use(express.json())
app.use(cors({origin: ["http://localhost:3000"], methods: ["GET", "POST"], credentials: true}))

app.post("/login", (req, res)=>{
    db.query("select * from login where email = ? and password = ?", [req.body.email, req.body.password], (err, result)=>{
        if (err){
            console.log(err)
        }
        else{
            if (result.length == 0){
                res.send("no user")
            }
            else{
                res.send([result[0].userId])
            }
        }
    })
})

app.post("/signUp", (req, res)=>{
    db.query("select * from login where email = ?", [req.body.email], (err, result)=>{
        if (err){
            console.log(err)
        }
        else{
            if (result.length == 0){
                db.query("insert into login (email, password) values(?, ?)", [req.body.email.trim(), req.body.password], (err, result)=>{
                    if (err){
                        console.log(err)
                    }
                    else{
                        res.send([result.insertId])
                    } 
                })
            }
            else{
                res.send("email taken")
            }
        }
    })
})

app.post("/createTest", (req, res)=>{

    db.query("insert into tests (title, userId) values(?, ?)", [req.body.title, req.body.userId], (err, result)=>{
        if (err){
            console.log(err)
        }
        else{
            var testId =  result.insertId
            for (let i = 0; i < req.body.slides.length; i++) {
                db.query("insert into questions (question, testId) values(?, ?)", [req.body.slides[i].question, testId], (err, result2)=>{
                    if (err){
                        console.log(err)
                    }
                    else{
                        var questionId =  result2.insertId
                        for (let x = 0; x < req.body.slides[i].answers.length; x++) {
                            db.query("insert into answer (answer, questionId, correct) values(?, ?, ?)", [req.body.slides[i].answers[x].answer, questionId, req.body.slides[i].answers[x].correct], (err, result)=>{
                                if (err){
                                    console.log(err)
                                }
                                if (i == req.body.slides.length-1 && x == req.body.slides[i].answers.length-1){
                                    res.send("ok")
                                }
                            }) 
                            
                        }
                    }
                })      
            }
        }
    })
})

app.post("/getTests", (req, res)=>{
    db.query("select * from tests where userId = ?", [req.body.userId], (err, result)=>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post("/getTestInfo", (req, res)=>{
    db.query("select * from questions where testId = ?", [req.body.testId], (err, result)=>{
        if (err){
            console.log(err)
        }
        else{
            var questionAnswer = [...result]
            for (let i = 0; i < result.length; i++) {
                db.query("select * from answer where questionId = ?", [result[i].questionId], (err, result2)=>{
                    if (err){
                        console.log(err)
                    }
                    else{
                        questionAnswer[i].answers = result2
                        if (i == questionAnswer.length-1){
                            res.send(questionAnswer)
                        }
                    }
                })
            }
        }
    })
})

app.post("/getTestBySearch", (req, res)=>{
    db.query("select * from tests where testId = ? or title = ?", [req.body.searchResult, req.body.searchResult], (err, result)=>{
        if (err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})