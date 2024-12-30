import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {JWTPayload} from "./types";
import {Roles} from "@prisma/client";
import {IS_PUBLIC_KEY} from "./shared/decorators/permissions/Public";
import {RolesGuard} from "./shared/decorators/permissions/Roles";

@Injectable()
class AppGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    private extractTokenFromHeader(req:Request) {
        const {token} = req.cookies;
        return token
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        const roles = this.getRoles(context);
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(isPublic) return true;
        if(!token) throw new UnauthorizedException();

        try{
            req["user"] = await this.getTokenPayload(roles, token);
        }catch(err){
            this.handleError(err);
        }
        return true;
    }

    private handleError(error:Error){
        if(error instanceof ForbiddenException) throw new ForbiddenException()
        throw new UnauthorizedException();
    }

    private getRoles(context:ExecutionContext):Roles[] {
        return this.reflector.get(RolesGuard, context.getHandler())
    }

    /**
     *
     * @param roles
     * @param token
     * @private
     * @throws ForbiddenException
     */
    private async getTokenPayload(roles:Roles[], token:string):Promise<JWTPayload>{
        const payload:JWTPayload = await this.jwtService.verifyAsync(token, {
            secret:process.env.JWT_SECRET
        })
        if(roles.includes(Roles.ADMIN) && !payload.roles.includes(Roles.ADMIN)) throw new ForbiddenException();
        return payload
    }
}

export default AppGuard;
