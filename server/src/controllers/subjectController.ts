import { Request, Response } from 'express';
import pool from '../database';

class SubjectController {

    public async findAll(req: Request, res: Response){
        const subjects = await pool.query(' SELECT * FROM subject ');
        res.json(subjects);
    }

    public async findById(req: Request, res: Response){
        const subjects = await pool.query(' SELECT * FROM subject WHERE subject_id = ? ', 
                                          [req.params.id]);
        res.json(subjects[0]);
    }

    public async create(req: Request, res: Response){
        await pool.query(' INSERT INTO subject SET ? ', [req.body]);
        res.json(req.body);
    }

    public async update(req: Request, res: Response){
        await pool.query(' UPDATE subject SET ? ', [req.body]);
        res.json(req.body);
    }

    public async registerTeacher(req: Request, res: Response){
        const teacher_id = req.body.teacher_id;
        await pool.query(' INSERT INTO subject_teacher (subject_id, teacher_id) VALUES ( ? , ? ) ',
                         [req.params.id, teacher_id]);
        res.json('Profesor registrado');
    }
    /* 
    INSERT INTO student_subject (student_id, subject_id, subject_teacher_id)
    -> VALUES (1, 1,
    -> (SELECT subject_teacher_id
    -> FROM subject_teacher
    -> WHERE subject_id=1));
    */
    public async registerStudent(req: Request, res: Response){
        const student_id = req.body.student_id;
        await pool.query(' INSERT INTO student_subject (student_id, subject_id, subject_teacher_id) ' + 
                         ' VALUES ( ? , ? , ' + 
                         '  ( SELECT subject_teacher_id ' + 
                         '    FROM subject_teacher ' + 
                         '    WHERE subject_id = ? ) ' + 
                         ' ) ', [student_id, req.params.id, req.params.id]);
        res.json('Estudiente registrado');
    }
}

export const subjectController = new SubjectController();