"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
class StudentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', studentController_1.studentController.findAll);
        this.router.get('/:id', studentController_1.studentController.findById);
        this.router.post('/', studentController_1.studentController.create);
        this.router.put('/:id', studentController_1.studentController.update);
    }
}
const studentRoutes = new StudentRoutes();
exports.default = studentRoutes.router;
