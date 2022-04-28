"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subjectController_1 = require("../controllers/subjectController");
class SubjectRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', subjectController_1.subjectController.findAll);
        this.router.get('/:id', subjectController_1.subjectController.findById);
        this.router.post('/', subjectController_1.subjectController.create);
        this.router.put('/:id', subjectController_1.subjectController.update);
        this.router.put('/:id/teacher', subjectController_1.subjectController.registerTeacher);
        this.router.put('/:id/student', subjectController_1.subjectController.registerStudent);
    }
}
const subjectRoutes = new SubjectRoutes();
exports.default = subjectRoutes.router;
