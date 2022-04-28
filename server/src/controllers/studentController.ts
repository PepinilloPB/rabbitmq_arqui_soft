import { Request, Response } from 'express';
import pool from '../database';

class StudentController {

    public async findAll(req: Request, res: Response){
        const students = await pool.query(' SELECT * FROM student ');
        res.json(students);
    }

    public async findById(req: Request, res: Response){
        const students = await pool.query(' SELECT * FROM student WHERE student_id = ? ', 
                                          [req.params.id]);
        res.json(students[0]);
    }

    public async create(req: Request, res: Response){
        await pool.query(' INSERT INTO student SET ? ', [req.body]);
        res.json(req.body);
    }

    public async update(req: Request, res: Response){
        await pool.query(' UPDATE student SET ? ', [req.body]);
        res.json(req.body);
    }
}

export const studentController = new StudentController();