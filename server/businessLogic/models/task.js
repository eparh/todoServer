'use strict';

class Task {
    constructor(id, author, title, description) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.description = description;
    }
}

module.exports = Task;