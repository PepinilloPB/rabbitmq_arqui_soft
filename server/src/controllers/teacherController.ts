import { Request, Response } from 'express';
import pool from '../database';

class TeacherController {

    public async findAll(req: Request, res: Response){
        const teachers = await pool.query(' SELECT * FROM teacher ');
        res.json(teachers);
    }

    public async findById(req: Request, res: Response){
        const teachers = await pool.query(' SELECT * FROM teacher WHERE teacher_id = ? ', 
                                          [req.params.id]);
        res.json(teachers[0]);
    }

    public async create(req: Request, res: Response){
        await pool.query(' INSERT INTO teacher SET ? ', [req.body]);
        res.json(req.body);
    }

    public async update(req: Request, res: Response){
        await pool.query(' UPDATE teacher SET ? ', [req.body]);
        res.json(req.body);
    }
}

export const teacherController = new TeacherController();