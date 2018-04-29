'use strict';

class User {
    constructor(id, email, password, encryptedPassword, role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.encryptedPassword = encryptedPassword;
        this.role = role;
    }
}

module.exports = User;