import {
    ApiProperty
} from '@nestjs/swagger'
import { $Enums, Usuario } from '@prisma/client'

type UserWithoutPassword = Omit<Usuario, 'password'>

export class UsersEntity implements UserWithoutPassword {
    @ApiProperty()
    email: string;
    @ApiProperty()
    telephone: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    createAt: Date;
    @ApiProperty()
    updated: Date;
    @ApiProperty()
    id: number;
    @ApiProperty()
    tipoUsuario: $Enums.TipoUsuario;
}