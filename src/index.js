const express=require("express")
const hbs=require("hbs")
const path=require("path")
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const User=require("./models/users")
const bcrypt = require('bcrypt');

//initialisation
const server=express()

const connexionString="mongodb://127.0.0.1:27017/clean-app"

mongoose.connect(connexionString,{useNewUrlParser: true, useUnifiedTopology: true})

hbs.registerPartials(path.join(__dirname,"../views/partials"))
//route de test:
server.set("view engine","hbs")
server.use(bodyparser.json())
server.get("/",(req, res)=>{
    // res.send("cest bon")
  
    const creator={
        name:"ali",
        lastName:"serghine"
    }
    res.render("home",creator);
})
server.get("/inscription",(req,res)=>{
    res.render("inscription")
})
server.get("/connexion",(req,res)=>{
    res.render("connexion")
})

server.post("/connexion", async(req,res)=>{
 console.log(req.body)
const{email,password}=req.body
const user=await User.findOne({email:req.body.email})
console.log(user)
if(!user){
  return  res.status(400).send({error:"email ou mot de passe incorrect"})
}
const match=bcrypt.compare(password,user.password)
console.log('les deux mots de passe correspendent:',match)

if(!match){
   return res.status(400).send({message:"le mot de passe ou email incorect"})
}else{
    res.send("connecter avec success")
}
res.send(req.body)

//if(!user)
//res.



})
  
server.post("/inscription",async(req,res)=>{
    //console.log(req.body)
    const {password:PlaintextPassword, ...rest}=req.body
    //console.log(req.body)
    //const PlaintextPassword=req.body.password
    const Passwordhach=await bcrypt.hash(PlaintextPassword,10)
    const user=new User({
        ...rest,
        password:Passwordhach
    })
    console.log(Passwordhach)
    //return res.send()
    user.save().then(()=>{res.send(user)}).catch(erreur=>{
        console.log('erreur lors du telechargement',erreur)
    })
   
})



const port=4000
server.listen(port,()=>{
    console.log(`le serveur boen charger a cette adress: http://localhost:${port}`);
})