import {CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {IS_PUBLIC_KEY} from "../../shared/decorators/Public";


class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    private extractTokenFromHeader(req:Request) {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if(isPublic) return true;
        if(!token) throw new UnauthorizedException();

        try{
            const payload = this.jwtService.verifyAsync(token, {
                secret:process.env.JWT_SECRET
            })
            req["user"] = payload;
        }catch(err){
            throw new UnauthorizedException();
        }
        return true;
    }
}

export default AuthGuard;
