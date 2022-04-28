import { Router } from "express";
import { subjectController } from "../controllers/subjectController";

class SubjectRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.get('/', subjectController.findAll);
        this.router.get('/:id', subjectController.findById);
        this.router.post('/', subjectController.create);
        this.router.put('/:id', subjectController.update);
        this.router.put('/:id/teacher', subjectController.registerTeacher);
        this.router.put('/:id/student', subjectController.registerStudent);
    }
}

const subjectRoutes = new SubjectRoutes();
export default subjectRoutes.router;