'use strict';

class User {
    constructor(id, login, password, encryptedPassword, role) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.encryptedPassword = encryptedPassword;
        this.role = role;
    }
}

module.exports = User;