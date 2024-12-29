import {Injectable, UnauthorizedException} from '@nestjs/common';
import CreateUserDto from "./dto/createUser.dto";
import PrismaService from "../prisma/prisma.service";
import UserService from "../user/user.service";
import PasswordService from "../../shared/services/password.service";
import {Roles} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";

@Injectable()
class AuthorizationService {
    constructor(private prismaService: PrismaService,
                private userService:UserService,
                private passwordService:PasswordService,
                private jwtService:JwtService
    ) {}
    public async register(createUserDto:CreateUserDto){
        const existedUser = await this.userService.findOneByUserName(createUserDto.username);
        if(existedUser){
            throw new Error("User already exists");
        }
        const hash = await this.passwordService.hashPassword(createUserDto.password);
        return  this.prismaService.user.create({
            data:{
                ...createUserDto,
                password: hash,
                roles:[Roles.USER],
            }
        });
    }

    public async login(createUserDto:CreateUserDto){
        const existedUser = await this.userService.findOneByUserName(createUserDto.username);
        const isMatch = await this.passwordService.comparePassword(createUserDto.password);
        if(!isMatch){
            throw new UnauthorizedException("User already exists");
        }
        const payload = {password:existedUser.password, id:existedUser.id, roles:existedUser.roles};
        return {
            token:await this.jwtService.signAsync(payload)
        }
    }
}

export default AuthorizationService;
