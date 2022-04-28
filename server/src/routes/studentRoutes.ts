import { Router } from "express";
import { studentController } from "../controllers/studentController";

class StudentRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }
    
    config(): void{
        this.router.get('/', studentController.findAll);
        this.router.get('/:id', studentController.findById);
        this.router.post('/', studentController.create);
        this.router.put('/:id', studentController.update);
    }
}

const studentRoutes = new StudentRoutes();
export default studentRoutes.router;