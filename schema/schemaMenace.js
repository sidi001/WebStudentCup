

///schema contenant les schémas mongodb

const mongoose = require('mongoose');
const config = require('../config/config');

var menaceSchema = mongoose.Schema({
	adresse: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
		required: true
	},
	typeCrime: {
        type: String,
        required: true
	},
	mechant:{
        type:String,
		default:""
    },
    horaire:{
        type:String,
        default:""
	},
	description:{
        type:String,
        default:""
	},
    
},{ timestamps: { createdAt: 'created_at' }})



module.exports.Menace = mongoose.model('Menace', menaceSchema);