import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import studentRoutes from './routes/studentRoutes';
import teacherRoutes from './routes/teacherRoutes';
import subjectRoutes from './routes/subjectRoutes';

class Server{

    public app : Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config() : void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    routes() : void{
        this.app.use('/v1/api/students', studentRoutes);
        this.app.use('/v1/api/teachers', teacherRoutes);
        this.app.use('/v1/api/subjects', subjectRoutes);
    }
    start() : void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();