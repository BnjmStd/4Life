import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TipoUsuario } from './dto/tipo-usuario.enum';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    
    const { 
      email, telephone, 
      firstName, lastName, 
      password, tipoUsuario, 
      paciente, medico, 
      administrador } = createUserDto;

    const existingUser = await this.prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error('Ya existe un usuario con este email.');
    }

    const userData: any = {
      email,
      telephone,
      firstName,
      lastName,
      password,
      tipoUsuario,
    };

    // Verifica el tipo de usuario y agrega la relación correspondiente
    switch (tipoUsuario) {
      case TipoUsuario.PACIENTE:
        if (!paciente) throw new Error('Los datos de paciente son requeridos para el tipo de usuario PACIENTE.');
        userData.paciente = {
          create: {
            historialMedico: paciente.historialMedico,
          },
        };
        break;

      case TipoUsuario.MEDICO:
        if (!medico) throw new Error('Los datos de médico son requeridos para el tipo de usuario MEDICO.');
        userData.medico = {
          create: {
            especialidad: medico.especialidad,
          },
        };
        break;

      case TipoUsuario.ADMINISTRADOR:
        if (!administrador) throw new Error('Los datos de administrador son requeridos para el tipo de usuario ADMINISTRADOR.');
        userData.administrador = {
          create: {
            departamento: administrador.departamento,
          },
        };
        break;

      default:
        throw new Error('El tipo de usuario no es válido.');
    }

    return this.prisma.usuario.create({
      data: userData,
    });
  }

  findAll() {
    return this.prisma.usuario.findMany()
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
