import { Body, Injectable, Post } from '@nestjs/common';
import CreateUserDto from './dto/createUser.dto';

@Injectable()
class AuthorizationController {
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {}
}

export default AuthorizationController;
