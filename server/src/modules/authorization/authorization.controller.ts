import {Body, Controller, Post, Req, Res} from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import AuthorizationService from "./authorization.service";
import {Roles} from "@prisma/client";
import {RolesGuard} from "../../shared/decorators/permissions/Roles";
import {Public} from 'src/shared/decorators/permissions/Public';
import {Response, Request} from 'express';
@Controller("auth")
class AuthorizationController {

  constructor(private authService:AuthorizationService) {}

  @RolesGuard([Roles.ADMIN])
  @Post("/create")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Public()
  @Post("/login")
  async login(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const {token} = await this.authService.login(createUserDto);
    response.cookie("token", token,
    { httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    });
  }

  @Public()
  @Post("check-token")
  async checkLogin(@Req() req:Request, @Res({ passthrough: true }) response: Response) {
    try{
      const token:string | undefined = req.cookies.token;
      return this.authService.checkLogin(token);
    }catch(error){
      response.cookie("token", '', {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/"
      })
    }
  }
}

export default AuthorizationController;
