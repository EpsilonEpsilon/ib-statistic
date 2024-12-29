import PrismaService from "../prisma/prisma.service";
import {User} from "@prisma/client";
import {Injectable} from "@nestjs/common";

@Injectable()
class UserService {
    constructor(private prismaService:PrismaService) {}

     async findOneByUserName(username:User["username"]):Promise<User | null>{
       return this.prismaService.user.findUnique({where:{username}});
    }
zz
}

export default UserService;
