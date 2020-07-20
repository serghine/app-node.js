const mongoose=require("mongoose")





const User=mongoose.model("User",{
nom:{
    type:String,
    require:true
},
prenom:{
    type:String,
    require:true
   

   
},
email:{
    type:String,
    require:true
    
},  

password:{
    type:String,
    require:true
}

})

module.exports=User