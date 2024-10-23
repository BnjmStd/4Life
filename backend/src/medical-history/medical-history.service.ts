import { Injectable } from '@nestjs/common';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';

@Injectable()
export class MedicalHistoryService {
  create(createMedicalHistoryDto: CreateMedicalHistoryDto) {
    return 'This action adds a new medicalHistory';
  }

  findAll() {
    return `This action returns all medicalHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalHistory`;
  }

  update(id: number, updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    return `This action updates a #${id} medicalHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalHistory`;
  }
}
