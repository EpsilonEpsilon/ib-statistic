import { Module } from '@nestjs/common';
import AuthorizationModule from './authorization/authorization.module';

@Module({
  imports: [AuthorizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
