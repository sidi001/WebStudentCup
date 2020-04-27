//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

//Connexion à la base de donnée  
mongoose.connect('mongodb://localhost/heroesDB', {useNewUrlParser: true}).then(() => {
    console.log('Connected to mongoDB');
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://sidi:$[password]@localhost:27019/sididb?authSource=sidiAuth';

// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   client.close();
// });

//On définit notre objet express nommé app
const app = express();

//Body Parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

////On définit la route Hello
app.get('/hello',function(req,res){
    res.json("Hello World")
})

app.get('/user',function(req,res){
    res.json("user World")
})


//Définition du routeur
var router = express.Router();
app.use('/user', router);
require(__dirname + '/controllers/userController')(router);



//Définition et mise en place du port d'écoute
var port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));