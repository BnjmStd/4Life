import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsInt, Min, Matches } from 'class-validator';

export class SignupDto {
    @ApiProperty({
        example: 'example@email.com',
        description: 'Correo electrónico válido del usuario.',
        required: true,
        format: 'email',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description: 'Contraseña del usuario. Debe contener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y símbolos.',
        required: true,
        minLength: 8,
    })
    @IsString()
    @MinLength(8)
    @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, { message: 'password too weak' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description: 'Confirmación de la contraseña, debe coincidir con el campo "password".',
        required: true,
        minLength: 8,
    })
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    passwordConfirm: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Nombre completo del usuario.',
        required: false,
        minLength: 2,
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 25,
        description: 'Edad del usuario. Debe ser un número mayor o igual a 18.',
        required: true,
        minimum: 18,
    })
    @IsInt()
    @Min(18)
    @IsNotEmpty()
    age: number;
}
