import { Router } from "express";
import { teacherController } from "../controllers/teacherController";

class TeacherRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.get('/', teacherController.findAll);
        this.router.get('/:id', teacherController.findById);
        this.router.post('/', teacherController.create);
        this.router.put('/:id', teacherController.update);
    }
}

const teacherRoutes = new TeacherRoutes();
export default teacherRoutes.router;