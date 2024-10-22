import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ExamsModule, PrismaModule, AuthModule],
})
export class AppModule {}
