'use strict';
module.exports = () => {
    let User = class {
        constructor(username, password) {
            this.username = username;
            this.password = password;
        }
    };
    return User;
};