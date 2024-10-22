import { IsString } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  especialidad: string;
}
