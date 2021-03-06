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
exports.teacherController = void 0;
const database_1 = __importDefault(require("../database"));
class TeacherController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = yield database_1.default.query(' SELECT * FROM teacher ');
            res.json(teachers);
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = yield database_1.default.query(' SELECT * FROM teacher WHERE teacher_id = ? ', [req.params.id]);
            res.json(teachers[0]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' INSERT INTO teacher SET ? ', [req.body]);
            res.json(req.body);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(' UPDATE teacher SET ? ', [req.body]);
            res.json(req.body);
        });
    }
}
exports.teacherController = new TeacherController();
