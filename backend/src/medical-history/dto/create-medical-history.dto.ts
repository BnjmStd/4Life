import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class CreateMedicalHistoryDto {
    @ApiProperty({
        example: 'Descripción del historial médico.',
        description: 'Texto que describe la entrada del historial médico.',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty({
        example: '2024-10-23T00:00:00.000Z',
        description: 'Fecha de la entrada en el historial médico.',
        required: false,
    })
    @IsOptional()
    @IsDate()
    fecha?: Date; 

    @ApiProperty({
        example: 1,
        description: 'ID del paciente asociado a este historial médico.',
        required: true,
    })
    @IsInt()
    @IsNotEmpty()
    pacienteId: number;
}
