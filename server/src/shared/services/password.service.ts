import {Injectable} from "@nestjs/common";
import {compare, genSalt, hash} from "bcrypt"
import {ConfigService} from "@nestjs/config";

@Injectable()
class PasswordService {
    constructor(private readonly configService: ConfigService) {}
    public async hashPassword(password: string):Promise<string> {
        return new Promise((resolve, reject) => {
            genSalt(parseInt(this.configService.get("SALT")), (err, salt) => {
                if(err) return reject(err);
                hash(password, salt, function(err, hash) {
                    if(err) return reject(err);
                    return resolve(hash);
                });
            })
        })
    }

    public async comparePassword(password:string):Promise<boolean> {
        return new Promise((resolve, reject) => {
            compare(password, password, function(err, isMatch) {
                if(err) return reject(err);
                return resolve(isMatch);
            })
        })
    }
}
export default PasswordService;
