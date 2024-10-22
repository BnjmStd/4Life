import { IsString } from 'class-validator';

export class CreateAdministradorDto {
  @IsString()
  departamento: string;
}
