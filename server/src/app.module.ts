import {Module} from '@nestjs/common';
import AuthorizationModule from './modules/authorization/authorization.module';
import PrismaModule from "./modules/prisma/prisma.module";
import SharedModule from "./shared/shared.module";
import {ConfigModule} from "@nestjs/config";
import AuthGuard from "./modules/authorization/auth.guard";

@Module({
  imports: [
    AuthorizationModule,
    PrismaModule,
    SharedModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],
  providers:[
    {
      provide:"APP_GUARD",
      useClass:AuthGuard
    }
  ]
})
export class AppModule {
}
