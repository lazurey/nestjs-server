import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MomentController } from './moment/moment.controller';
import { MomentService } from './moment/moment.service';
import { MomentMemoryRepository } from './moment/moment.repository';

@Module({
  imports: [],
  controllers: [AppController, MomentController],
  providers: [
    AppService,
    MomentService,
    {
      provide: 'momentDa',
      useClass: MomentMemoryRepository,
    }
  ],
})
export class AppModule {
}
