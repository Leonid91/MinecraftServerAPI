'use strict';
module.exports = () => {
    let User = class {
        constructor(name, role) {
            this.name = name;
            this.role = role;
        }
    };
    return User;
};