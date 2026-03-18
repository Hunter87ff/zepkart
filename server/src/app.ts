import config from '@config';
import e from 'express';
import middlewares from '@middleware';


export default class ZepKart{
    public app = e();

    constructor(){
        middlewares(this.app);
    }

    async start(){
        this.app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    }

}