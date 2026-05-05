const express = require("express")
const router = express.Router()
const db = require("../data/db")

router.get("/", async(req,res) => {
    try{
        const [data] = await db.execute("SELECT * FROM egzersizler")
        res.render("egzersizler/liste",{egzersizler:data}) 
        
    }
    catch(err){
        console.log(err)
        res.status(500).send("DB Hatası")
    }
})

router.get("/ekle",(req,res) => {
    res.render("egzersizler/ekleme")
})

router.post("/ekle",async(req,res) => {
    const {isim,kas_grubu,ekipman,aciklama} = req.body
    try{
        await db.execute(
            "INSERT INTO egzersizler (isim,kas_grubu,ekipman,aciklama) VALUES (?,?,?,?)",
            [isim,kas_grubu,ekipman,aciklama]
        )
        res.redirect("/egzersizler")
   
    }
    catch(err){
        console.log(err)
        res.status(500).send("DB Hatası")
    }
})

router.get("/edit/:id",async(req,res) => { 
    const id = req.params.id
    try{
        const [data] = await db.execute(
            `SELECT * FROM egzersizler WHERE id=?`,[id]
        )
        res.render("egzersizler/duzenleme",{egzersiz:data[0]})
    }
    catch(err){
        console.log(err)
        res.status(500).send("DB Hatası")
    }
    
})

router.post("/edit/:id",async(req,res)=> {
    const {isim,kas_grubu,ekipman,aciklama} = req.body
    const id = req.params.id
    try{
        await db.execute(
            "UPDATE egzersizler SET isim=?, kas_grubu=?, ekipman=?, aciklama=? WHERE id=?",
            [isim,kas_grubu,ekipman,aciklama,id]
        )
        res.redirect("/egzersizler")
    }
    catch(err){
        console.log(err)
        res.status(500).send("DB Hatası")
    }
})

module.exports = router