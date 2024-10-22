import {
  ApiProperty
} from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';
import { TipoUsuario } from './tipo-usuario.enum';
import { CreateMedicoDto } from './create-medico.dto';
import { CreateAdministradorDto } from './create-administrador.dto';
import { CreatePacienteDto } from './create-paciente.dto';

export class CreateUserDto {
  @ApiProperty({
    required: true
  })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsString()
  password: string;

  @IsEnum(TipoUsuario)
  tipoUsuario: TipoUsuario;

  @IsOptional()
  paciente?: CreatePacienteDto;

  @IsOptional()
  medico?: CreateMedicoDto;

  @IsOptional()
  administrador?: CreateAdministradorDto;
}