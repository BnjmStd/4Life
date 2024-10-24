import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
