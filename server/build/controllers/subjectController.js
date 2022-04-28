"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectController = void 0;
const database_1 = __importDefault(require("../database"));
class SubjectController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjects = yield database_1.default.query(' SELECT * FROM subject ');
            res.json(subjects);
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjects = yield database_1.default.query(' SELECT * FROM subject WHERE subject_id = ? ', [req.params.id]);
            res.json(subjects[0]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' INSERT INTO subject SET ? ', [req.body]);
            res.json(req.body);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' UPDATE subject SET ? ', [req.body]);
            res.json(req.body);
        });
    }
    registerTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher_id = req.body.teacher_id;
            yield database_1.default.query(' INSERT INTO subject_teacher (subject_id, teacher_id) VALUES ( ? , ? ) ', [req.params.id, teacher_id]);
            res.json('Profesor registrado');
        });
    }
    /*
    INSERT INTO student_subject (student_id, subject_id, subject_teacher_id)
    -> VALUES (1, 1,
    -> (SELECT subject_teacher_id
    -> FROM subject_teacher
    -> WHERE subject_id=1));
    */
    registerStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student_id = req.body.student_id;
            yield database_1.default.query(' INSERT INTO student_subject (student_id, subject_id, subject_teacher_id) ' +
                ' VALUES ( ? , ? , ' +
                '  ( SELECT subject_teacher_id ' +
                '    FROM subject_teacher ' +
                '    WHERE subject_id = ? ) ' +
                ' ) ', [student_id, req.params.id, req.params.id]);
            res.json('Estudiente registrado');
        });
    }
}
exports.subjectController = new SubjectController();
