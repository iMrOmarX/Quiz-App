const express = require("express")

const app = express()
const PORT= 3000

require("../db/mongoose")
const Question = require("../db/models/questions")
const User =  require("../db/models/users")

const leaderboardsMAX = 10;

app.use(express.static(__dirname + "/public"))
app.use(express.json())

app.get("/", (req ,res) => {
    res.send('index.html')
})

app.get("/playapi", (req,res) => {
    Question.findRandom({}, {}, {limit: 5},(err, results) => {
        if (!err) {
            res.send(results)
        }
    });
})

app.get("/play", (req, res) => {
    res.sendFile("C:/Users/Omar/Documents/QuizApp2/web-server/public/play.html")
})

app.get("/addQuestion" , (req ,res) => {
    res.sendFile("C:/Users/Omar/Documents/QuizApp2/web-server/public/addQuestion.html")
})

app.post('/leaderboardsScore', async (req,res) =>{
    try {
        console.log(req.body)
        const user = await User.findOne({name:req.body.name})
        console.log(user)
        if (user){
            if(user.bestScore < req.body.bestScore) {
                user.bestScore = req.body.bestScore
                await user.save()
                res.status(200).send("Old User has been updated")
            }
            else {
                res.send()
            }
        }
        else {
            const newUser = new User(req.body)
            console.log(newUser)
            await newUser.save()
            res.status(201).send("New user has been saved")
        }
    } catch(e) {
        res.status(500).send(e)
    }
})

// Show top 10 players 
// Could improve it by showing all players in pages - done 
// Could improve by making insertion into Sorted so that we don't need to sort every time 
// Could improve by caching pages in front end so that when going to previous page it doesn't load again (caching) 

app.get('/leaderboards-api/:page', async (req,res) => {
    let users = await User.find({})
    

    users.sort((a,b) => b.bestScore - a.bestScore)
    
    // add user count to response 
    let page = req.params.page
    let finalUsers = users.slice(10 * (page - 1), (10* (page- 1)) + leaderboardsMAX)

    if(page == 1) {
        let userCount = await User.countDocuments()
        finalUsers.push({userCount: userCount})
    }
    res.send(finalUsers)
    
})

app.get('/leaderboards',async (req,res) => {
    
    res.status(200).sendFile("C:/Users/Omar/Documents/QuizApp2/web-server/public/leaderboards.html")
})

app.post("/addQuestion" , (req,res) => {
    let newQuestion = new Question(req.body) 
    newQuestion.save().then(()=> {
        res.send()
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.post("/login" , async (req ,res) => {

})


app.post("/answeredQuestion/:id/:isRight", async (req, res) => {
    try {
        let question = await Question.findById(req.params.id)
        if(req.params.isRight == 1){
            question.timesAnsweredRight++;
        }
        question.timesAnswered++
        question.save()
        res.status(200).send("Question has been updated !")
        console.log(req.params.id + "has been updated")
    } catch(e) {
        res.status(500).send(e)
    }
    
})


app.listen(PORT , () => {
    console.log("Server is up on port " + PORT)
})
