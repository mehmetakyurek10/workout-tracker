require("dotenv").config()
const db = require("./data/db")

const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
app.set("view engine", "ejs")
const path = require("path")
app.use(express.static(path.join(__dirname,"public")))

app.get("/", (req,res) => {
    res.send("Workout Tracker Hazır Ve Nazır")
})

// app.get("/test", async(req, res) => {
//     try{
//         const [data] = await db.execute("SELECT * FROM egzersizler")
//         res.json(data)
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).send("DB Hatası")
//     }

// })

app.get("/egzersizler", async(req,res) => {
    try{
        const [data] = await db.execute("SELECT * FROM egzersizler")
        res.render("egzersizler/liste",{egzersizler:data})
    }
    catch(err){
        console.log(err)
        res.status(500).send("DB Hatası")
    }
})

app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`)
})