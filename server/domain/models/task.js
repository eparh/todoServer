'use strict';

class Task {
    constructor(id, author, description, isCompleted) {
        this.id = id;
        this.author = author;
        this.isCompleted = isCompleted;
        this.description = description;
    }
}

module.exports = Task;