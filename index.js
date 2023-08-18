const express = require('express')
const db = require("./db")
const application = express()
application.use(express.json())

application.get("/", function(request, response){
    // response.send("DataRockie")
    response.json({
        "name":"DataRockie",
        "version":"1.0"
    })
})

application.post("/hotels", function(request, response){
    const name = request.body.name
    const price = request.body.price

    const statement = db.prepare("INSERT INTO hotels (name, price) VALUES (?,?)")
    const result = statement.run(name, price)
    response.json(result)
})

application.get("/hotels", function(request, response){
    const statement = db.prepare("SELECT * FROM hotels")
    const result = statement.all()
    response.json(result)
})

application.get ("/hotels/:id", function(request, response){
    const {id} = request.params

    const statement = db.prepare("SELECT * FROM hotels WHERE id = ?")
    const result = statement.get(id)
    response.json(result)
})

//patch can edit only some but  put will be adjust the whole 
application.patch ("/hotels/:id",function(request, response){
    const {id} = request.params
    const {name, price} = request.body
    const statement = db.prepare("UPDATE hotels SET name = ? ，price = ? WHERE id = ?")
    const result = statement.run(name, price, id)
    response.json(result)
})

application.delete("/hotels/id", function(request, response){
    const {id} = request.params
    const statement = db.prepare ("DELETE FROM hotels WHERE id = ?")
    const result = statement.run(id)
    response.json(result)
})


application.listen(3000,function(){
    console.log("Application started at http://localhost:3000")
})
