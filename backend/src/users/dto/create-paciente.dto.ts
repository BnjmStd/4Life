import { IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  historialMedico: string;
}
