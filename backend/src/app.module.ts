import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ExamsModule } from './exams/exams.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [UsersModule, ExamsModule, PrismaModule, AuthModule, MedicalHistoryModule, ExamModule],
})
export class AppModule {}
