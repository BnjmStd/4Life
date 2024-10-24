import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical-history.dto';

@Controller('history')
export class MedicalHistoryController {
  
  constructor(
    private readonly medicalHistoryService: MedicalHistoryService
  ) {}

  @Post()
  create(@Body() createMedicalHistoryDto: CreateMedicalHistoryDto) {
    return this.medicalHistoryService.create(createMedicalHistoryDto);
  }

  @Get(':id')
  // todo el historial médico del usuario
  findAll(@Param('id') id: string) { 
    return this.medicalHistoryService.findAll();
  }

  @Get('antecedent/:id')
  // un historial médico específico
  findOne(@Param('id') id: string) {
    return this.medicalHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    return this.medicalHistoryService.update(+id, updateMedicalHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalHistoryService.remove(+id);
  }
}
