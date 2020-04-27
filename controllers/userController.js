
//Définition du routeur /user
//un dossier /controllers contenant notre API

module.exports = function (app) {
    /*
    C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user
    */

 
   const account = require('./account/lib.js');


  
   
       app.post('/login',account.login);
       app.post('/signup',account.signup);
       app.post('/getUserbyId',account.getUserbyId);
       app.post('/insertUser',account.insertUser);
       app.post('/insertMenace',account.insertMenace);
        app.post('/updateUser',account.updateUser);

        app.post('/envoyerPiece',account.envoyerPiece);
        app.post('/piece', account.uploadPiece);
        app.post('/annulerUploadPhoto', account.AnnulerUploadPhoto);

        app.post('/updatePhoto',account.updatePhoto);
        app.post('/photo', account.uploadImage);

        app.get('/getAllUser',account.getAllUser);
        app.get('/getAllMenace',account.getAllMenace);

   

}