import {Reflector} from "@nestjs/core";
import {Roles as RolesEnum} from "@prisma/client";

export const RolesGuard = Reflector.createDecorator<RolesEnum[]>()
