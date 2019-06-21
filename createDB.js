var MongoClient = require('mongodb').MongoClient

const url = "mongodb://localhost:27017/"

MongoClient.connect(url, function(error,db){ //specify location of database to be connect
    //if can connect -> have value in variable db, if cannot have error
    if(error) throw error
    var dbo = db.db("Assignment1_5881079") //connect to specific database
    dbo.createCollection("Users",function(err,res){
        if(err)throw err
        console.log("The collection is created")
        db.close();
    })
})