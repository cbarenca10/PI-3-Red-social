'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
		name: String,
		surname: String,
		nick: String,
		email: String,
		password: String,
		role: String,
		image: String,
		continente: String,
		ayuda:String
});

module.exports = mongoose.model('User', UserSchema);