import bcrypt from "bcryptjs";
import { Token } from "./token";


export default class Helper {
    static validateToken(token: string){
        return Token.fromToken(token)?.jwt;
    }

    static validateNumber(num: string){
        try{
            const n= Number(num);
            if(!Number.isInteger(n) || n <= 0){
                return null;
            }
            return n;
            
        }catch(e){
            return null;
        }
    }

    static dayToMili(days: number=1){
        return days * 24 * 60 * 60 * 1000;
    }

    static async hashPassword(password: string){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    static async comparePassword(password: string, hashedPassword: string){
        return await bcrypt.compare(password, hashedPassword);
    }

    /**
     * accepts time in seconds and format it from big unit to small as 1days 1hrs 1mins
     * @param seconds 
     * @returns 
     */
    static parseTime(seconds:number){
        const months = Math.floor(seconds / (30 * 24 * 3600));
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= 24 * 3600;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;
        let result = "";
        
        if (months > 0) {
            result += `${months} months `;
        }
        if (days > 0) {
            result += `${days} days `;
        }
        if (hours > 0) {
            result += `${hours}hrs `;
        }
        if (minutes > 0) {
            result += `${minutes}mins `;
        }
        if (seconds > 0 || result === "") {
            result += `${seconds}s`;
        }
        return result.trim();
    }
}