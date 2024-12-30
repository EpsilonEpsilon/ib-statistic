import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import CreateUserDto from "./dto/createUser.dto";
import PrismaService from "../prisma/prisma.service";
import UserService from "../user/user.service";
import PasswordService from "../../shared/services/password.service";
import {Roles} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";
import {JWTPayload} from "../../types";

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
            throw new ConflictException("User already exists");
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

    public async login(createUserDto:CreateUserDto) {
        const existedUser = await this.userService.findOneByUserName(createUserDto.username);
        if(!existedUser)  throw new UnauthorizedException("Password or login does not match")
        const isMatch = await this.passwordService.comparePassword(createUserDto.password, existedUser.password);
        if(!isMatch){
            throw new UnauthorizedException("Password or login does not match");
        }
        const payload:JWTPayload = {password:existedUser.password, id:existedUser.id, roles:existedUser.roles};
        const token = await this.jwtService.signAsync(payload);
        return {
            token
        }
    }

    public async checkLogin(token:string){
        try{
            await this.jwtService.verifyAsync(token, {secret:process.env.JWT_SECRET})
        }catch (e){
            console.log(e);
            throw new UnauthorizedException("Token is not valid");
        }
    }
}

export default AuthorizationService;
