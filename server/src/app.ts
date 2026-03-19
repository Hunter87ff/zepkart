import config from '@config';
import e from 'express';
import middlewares from '@middleware';
import connectDb from '@config/db';
// import { loadDemoData } from '@/demo';


export default class ZepKart{
    public app = e();

    constructor(){
        middlewares(this.app);
    }

    async start(){
        this.app.listen(config.port, () => {
            connectDb();
            // loadDemoData();
            console.log(`Server is running on port ${config.port}`);
        });
    }

}