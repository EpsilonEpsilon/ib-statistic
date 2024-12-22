import { Module } from '@nestjs/common';
import AuthorizationProvider from './authorization.provider';
import AuthorizationController from './authorization.controller';

@Module({
  providers: [AuthorizationProvider],
  controllers: [AuthorizationController],
})
class AuthorizationModule {}

export default AuthorizationModule;
