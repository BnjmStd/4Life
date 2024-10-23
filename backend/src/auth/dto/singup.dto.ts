import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
    @ApiProperty({
        example: 'example@email.com',
        description: 'Correo electrónico válido del usuario.',
        required: true,
        format: 'email',
    })
    email: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description: 'Contraseña del usuario. Debe contener al menos 8 caracteres, incluyendo letras mayúsculas, minúsculas, números y símbolos.',
        required: true,
        minLength: 8,
    })
    password: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description: 'Confirmación de la contraseña, debe coincidir con el campo "password".',
        required: true,
        minLength: 8,
    })
    passwordConfirm: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Nombre completo del usuario.',
        required: true,
        minLength: 2,
    })
    name: string;

    @ApiProperty({
        example: 25,
        description: 'Edad del usuario. Debe ser un número mayor o igual a 18.',
        required: true,
        minimum: 18,
    })
    age: number;
}  