const UserSchema= require('../../schema/schemaUser.js');
const User=UserSchema.User;

const MenaceSchema= require('../../schema/schemaMenace.js');
const Menace=MenaceSchema.Menace;
const passwordHash = require("password-hash");


var formidable = require('formidable');

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

function login(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": user.getToken(),
                        "id":user._id,
                        "admin":user.admin,
                        "text": "Authentification réussi"
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

function getUserbyId(req, res) {


    var id =req.body.id;
    // console.log("id");
    User.findOne({
            _id: id
        }, function (err, result) {
            if (err) {
                res.status(500).json({
                    'status':"une erreur de chargement avec idG"
                })
            } else {
                if (result) {
                    res.status(200).json(
                        {'response':result,
                        'status':'success'
                        }
                    );
                } else {
                    res.status(200).json(
                        {
                        'status':'vide'
                        }
                    )
                }
            }
            // console.log(result);
        })
}

function updateUser(req, res) {

    var id=req.body.id;
    User.findById(id, function (err, result) {
        if (err) {
            console.error("aucun element n'a été trouvé");
        } else {
            result.nom=req.body.nom;
            result.prenom=req.body.prenom;
            result.pseudo=req.body.pseudo;
            result.zoneTag=req.body.zoneTag;
            result.description=req.body.description;
            result.adresse=req.body.adresse;
            result.tel=req.body.tel,
            result.profession=req.body.profession,
            result.sexe=req.body.sexe,
            result.age=req.body.age,
            result.photo="../images/Userprofil.jpeg",

            result.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        
                        "status": "Erreur interne 00 save"
                    })
                } else {
                    
                    res.status(200).json({
                        "id":user._id,
                        "status": "Succès save",
                    })
                }
            });
        }
    })
    
}

//fonction non utiliser...
function insertUser(req,res){
    var user = {
        nom:req.body.nom,
        prenom:req.body.prenom,
         pseudo:req.body.pseudo,
         zoneTag:req.body.zoneTag,
        description:req.body.description,
        adresse:req.body.adresse,
        tel:req.body.tel,
        profession:req.body.profession,
        sexe:req.body.sexe,
        age:req.body.age,
        photo:"./images/Userprofil.jpeg",

    };
    var _user = new     User(user);
    console.log(_user);
    

    _user.save(function (err, _u) {
        if (err) {
            res.status(500).json({
                
                "status": "Erreur interne 00 save"
            })
        } else {
            
            res.status(200).json({
                "id":_u._id,
                "status": "Succès save",
            })
        }
    });
}


function insertMenace(req,res){
    var m = {
        
        adresse:req.body.adresse,
        typeCrime:req.body.typeCrime,
        mechant:req.body.mechant,
        horaire:req.body.horaire,
        description:req.body.description,
        

    };
    var _m = new Menace(m);
    console.log(m);
    

    _m.save(function (err, _u) {
        if (err) {
            res.status(500).json({
                
                "status": "Erreur interne 00 save"
            })
        } else {
            
            res.status(200).json({
                "idUser":req.body.idUser,
                "status": "Succès save",
            })
        }
    });
}

function AnnulerUploadPhoto(req, res) {

    var uri=req.body.photo
    var fs = require('fs');

    fs.unlink(__dirname+'/../../client/public'+uri, function(err) {
      if (err) throw err;
    
      console.log('file deleted');
      res.status(200).json({
        "statusG": "Succès delete photo uri",
    })
    });
}


function envoyerPiece(req, res) {

    var id=req.body.idUser;
    var uri=req.body.piece;
    var paiement0=req.body.paiement;
    var infoPaiement0=req.body.infoPaiement;
    var profil=req.body.profil;

    var myquery = { _id: id };
    var newvalues = { $set: {"pieceUrl": uri,"paiement": paiement0, "infoPaiement":infoPaiement0,"profilValider":profil} };
    User.updateOne(myquery, newvalues, function(err, resultat) {
      if (err) throw err;
      console.log("1 document updated");
      res.status(200).json({
        "idUser":resultat._id,
        "statusG": "Succès save uri photo",
    })
    });

    
}


function uploadPiece(req, res){


    var form = new formidable.IncomingForm();
    form.parse(req);
    console.log(form);
    // console.log(__dirname);
    form.on('fileBegin', function (name, file){
        file.name='piece'+Date.now()+file.name;
        file.path = __dirname + '/../../client/public/pieces/' + file.name;
       
        console.log('prepare... ' + file.name);
    });
    console.log('prepare...2 ' );
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        res.status(200).json({
            "text": "element en registrer",
            "uri":'/pieces/' + file.name
        })
    });
    form.on('end', () => {
      })
      return;
}

function uploadImage(req, res){


    var form = new formidable.IncomingForm();
    form.parse(req);
    console.log(form);
    // console.log(__dirname);
    form.on('fileBegin', function (name, file){
        file.name=Date.now()+file.name;
        file.path = __dirname + '/../../client/public/images/' + file.name;
       
        console.log('prepare... ' + file.name);
    });
    console.log('prepare...2 ' );
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
        res.status(200).json({
            "text": "element en registrer",
            "uri":'/images/' + file.name
        })
    });
    form.on('end', () => {
      })
      return;
}


function updatePhoto(req, res) {

    var id=req.body.idUser;
    var uri=req.body.photo;

    var myquery = { _id: id };
    var newvalues = { $set: {"photo": uri } };
    User.updateOne(myquery, newvalues, function(err, resultat) {
      if (err) throw err;
      console.log("1 document updated");
      res.status(200).json({
        "idUser":resultat._id,
        "statusG": "Succès save uri photo",
    })
    });

    
}

function getAllUser(req,res){
    User.find()
    .then(function(doc){
        res.status(200).json({
            "response": doc,
        })
    })
};

function getAllMenace(req,res){
    Menace.find()
    .then(function(doc){
        res.status(200).json({
            "response": doc,
        })
    })
};

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
exports.getUserbyId = getUserbyId;
exports.updateUser = updateUser;
exports.insertUser = insertUser;
exports.AnnulerUploadPhoto = AnnulerUploadPhoto;
exports.envoyerPiece = envoyerPiece;
exports.uploadPiece = uploadPiece;
exports.updatePhoto = updatePhoto;
exports.uploadImage = uploadImage;
exports.getAllUser = getAllUser;
exports.getAllMenace = getAllMenace;
exports.insertMenace = insertMenace;
