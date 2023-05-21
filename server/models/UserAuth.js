const crypto = require('crypto');
 
const { Schema, model } = require('mongoose');

const userSchema = Schema({
    avatarId: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    passwordHash: String,
    salt: String,

    dateRegistration: {
        type: Date,
        required: true
    },
    isOnline: {
        type: Boolean,
        required: true
    }
}, 
{ collection: 'UsersAuth' }
);
 

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};
 
userSchema.methods.validPassword = function (password) {
    let passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.passwordHash === passwordHash;
};
 
const UsersAuth = model('UsersAuth', userSchema);
module.exports = UsersAuth;