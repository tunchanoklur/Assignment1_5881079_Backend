var mongodb = require('mongodb');
var express = require('express')
var app = express()
var body = require('body-parser') //use to accept data from request
var cors = require('cors')

app.use(cors())
app.use(body())
const url = "mongodb://localhost:27017/"

//get many contacts
app.get('/contacts/getMany',function(req,res){
    let MongoClient = require('mongodb').MongoClient
    MongoClient.connect(url, function(error,db){
        if(error) throw error
        let dbo = db.db("Assignment1_5881079")
            dbo.collection("Users").find({}).toArray(function(e,res_){
            if(e) throw e
            res.end(JSON.stringify(res_))
            db.close()
        })
    })
})

//Update
app.post('/contacts/update',function(req,res){
    let para = req.body
    let MongoClient = require('mongodb').MongoClient
    para.criteria._id = new mongodb.ObjectID(para.criteria._id)
    console.log(para.criteria)
    console.log(para.data)
    MongoClient.connect(url, function(error,db){
        if(error) throw error
        let dbo = db.db("Assignment1_5881079")
            dbo.collection("Users").updateOne(para.criteria,para.data,function(e,res_){
            if(e) throw e
            console.log(res_.modifiedCount+" item(s) updated")
            db.close()
            res.end(JSON.stringify(res_))
        })
    })
})

//create contact
app.post('/contacts/add',function(req,res){
    console.log(req.body)
    let data =  req.body
    let MongoClient = require('mongodb').MongoClient
    MongoClient.connect(url, function(error,db){
        if(error) throw error
        let dbo = db.db("Assignment1_5881079")
            dbo.collection("Users").insertOne(data,function(e,res_){
                if(e) throw e
                console.log("Insert "+ res.insertedCount +" item")
                db.close()
                res.end(JSON.stringify(res_))
            })
    })
})

//delete contact
app.post('/contacts/delete',function(req,res){
    console.log(req.body)
    let data =  req.body
    data._id = new mongodb.ObjectID(data._id)
    let MongoClient = require('mongodb').MongoClient
    MongoClient.connect(url, function(error,db){
        if(error) throw error
        let dbo = db.db("Assignment1_5881079")
            console.log(data)
            dbo.collection("Users").deleteOne(data,function(e,res_){
                if(e) throw e
                console.log("Delete "+ res.deletedCount +" item")
                db.close()
                res.end(JSON.stringify(res_))
            })
    })
})

var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s", host, port)
})