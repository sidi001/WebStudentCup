import axios from 'axios';
const headers = {
    'Content-Type': 'application/json'
}
const burl = "http://localhost:8000"

export default {
    login : function(email,password) {
        return axios.post(burl + '/user/login',{
            'email' : email,
            'password' : password
        },{
            headers: headers
        })
    },
    signup : function(send){
        return axios.post(burl + '/user/signup',send,{headers: headers})
    },
    
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    },

    getUserbyId:  function(id){
        return axios.post(burl + '/user/getUserbyId',{'id':id},{headers: headers});
    },
    insertUser: function(send){
        return axios.post(burl + '/user/insertUser',send,{headers: headers});
    },
    insertMenace: function(send){
        return axios.post(burl + '/user/insertMenace',send,{headers: headers});
    },
    updateUser: function(send){
        return axios.post(burl + '/user/updateUser',send,{headers: headers});
    },


    uploadPiece:function(data){
        return axios.post(burl + '/user/piece',data,{});
        //le header a revoir
    },
    envoyerPiece : function(send){
        return axios.post(burl + '/user/envoyerPiece',send,{headers: headers});
    },
    AnnulerUploadPhoto : function(send){
        return axios.post(burl + '/user/annulerUploadPhoto',send,{headers: headers});
    },

    updatePhoto : function(send){
        return axios.post(burl + '/user/updatePhoto',send,{headers: headers});
    },

    uploadImage:function(data){
        return axios.post(burl + '/user/photo',data,{});
        //le header a revoir
    },

    getAllUser: function (){
        return axios.get(burl + '/user/getAllUser');

    },
    getAllMenace: function (){
        return axios.get(burl + '/user/getAllMenace');

    },
}
