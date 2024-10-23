import { PartialType } from '@nestjs/swagger';
import { CreateMedicalHistoryDto } from './create-medical-history.dto';

export class UpdateMedicalHistoryDto extends PartialType(CreateMedicalHistoryDto) {}
