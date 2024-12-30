import {Roles} from "@prisma/client";

export interface JWTPayload{
    id:number,
    password:string,
    roles:Roles[]
}
