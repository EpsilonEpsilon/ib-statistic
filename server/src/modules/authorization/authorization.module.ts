import {Module} from '@nestjs/common';
import AuthorizationService from './authorization.service';
import AuthorizationController from './authorization.controller';
import UserModule from "../user/user.module";
import PrismaService from "../prisma/prisma.service";
import PasswordService from "../../shared/services/password.service";
import {JwtModule} from "@nestjs/jwt";
import config from "../../config";


@Module({
  providers: [AuthorizationService, PrismaService, PasswordService],
  controllers: [AuthorizationController],
  imports: [UserModule, JwtModule.register({
    global:true,
    secret:process.env["SECRET_TOKEN"],
    signOptions: {
      expiresIn:config.jwt.expireIn
    }
  }),],
})
class AuthorizationModule {}

export default AuthorizationModule;
