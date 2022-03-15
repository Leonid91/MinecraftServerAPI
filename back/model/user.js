'use strict';
module.exports = () => {
    let User = class {
        constructor(pseudo, password, token) {
            this.pseudo = pseudo;
            this.password = password;
            this.token = token;
        }
    };
    return User;
};