import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        required: true,
        example: 'example@email.com',
    })
    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    @IsNotEmpty({ message: 'El correo electrónico no debe estar vacío' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        required: true,
        example: 'StrongPassword123!',
    })
    @IsNotEmpty({ message: 'La contraseña no debe estar vacía' })
    password: string;
}