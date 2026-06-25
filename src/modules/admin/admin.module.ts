import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { EventModule } from '../event/event.module';
import { UsersModule } from '../users/users.module';
@Module({
  controllers: [AdminController],
  imports: [EventModule, UsersModule],
})
export class AdminModule {}
