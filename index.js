require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
app.set("view engine", "ejs")
const path = require("path")
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: false}))

//EGZERSİZLER
const egzersizlerRoutes = require("./routes/egzersizler")
app.use("/egzersizler",egzersizlerRoutes)

app.get("/", (req,res) => {
    res.render("ana_sayfa")
})

app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`)
})