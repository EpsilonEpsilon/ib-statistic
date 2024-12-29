import {Body, Controller, Post} from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';
import AuthorizationService from "./authorization.service";
import {Public} from "../../shared/decorators/Public";

@Controller("auth")
class AuthorizationController {

  constructor(private authService:AuthorizationService) {}

  @Public()
  @Post("/create")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("/login")
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
}

export default AuthorizationController;
