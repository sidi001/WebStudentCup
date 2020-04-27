

///schema contenant les schémas mongodb

const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

var userSchema = mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
		required: true
	},
	password: {
        type: String,
        required: true
	},
	nom:{
        type:String,
		default:""
    },
    prenom:{
        type:String,
        default:""
	},
	pseudo:{
        type:String,
        default:""
	},
	description:{
        type:String,
		default:""
    },
    admin:{
        type:Boolean,
        default:false
	},
	
	zoneTag:{
        type:Array
    },
    tel:{
        type:String,
        default:""
    },
    profession:{
        type:String,
        default:""
    },
    photo:{
		type:String,
		
    },
    pieceUrl:{
		type:String,
		default:""
	},
	adresse:{
		type:String,
		default:""
	},
    sexe:{
        type:String,
    },
    age:{
        type:String,
    },
    
},{ timestamps: { createdAt: 'created_at' }})


userSchema.methods = {
	authenticate: function (password) {
		return passwordHash.verify(password, this.password);
	},
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

module.exports.User = mongoose.model('User', userSchema);