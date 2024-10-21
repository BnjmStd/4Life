import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';

@Module({
  imports: [UsersModule, ExamsModule],
})
export class AppModule {}
