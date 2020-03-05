import {Logger, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MomentController } from './moment/moment.controller';
import { MomentService } from './moment/moment.service';
import { MomentMemoryRepository } from './moment/moment.repository';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController, MomentController],
  providers: [
    AppService,
    MomentService,
    Logger,
    {
      provide: 'momentDa',
      useClass: MomentMemoryRepository,
    }
  ],

})
export class AppModule {
}
