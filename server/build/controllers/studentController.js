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
exports.studentController = void 0;
const database_1 = __importDefault(require("../database"));
class StudentController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query(' SELECT * FROM student ');
            res.json(students);
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield database_1.default.query(' SELECT * FROM student WHERE student_id = ? ', [req.params.id]);
            res.json(students[0]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' INSERT INTO student SET ? ', [req.body]);
            res.json(req.body);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' UPDATE student SET ? ', [req.body]);
            res.json(req.body);
        });
    }
}
exports.studentController = new StudentController();
