import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreatePessoaFisicaDto {
    @ApiProperty({ example: 'Maria da Silva' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nome: string;

    @ApiProperty({ example: '52998224725' })
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{11}$/, {
        message: 'CPF deve conter 11 dígitos numéricos.',
    })
    cpf: string;

    @ApiProperty({ example: 'maria@email.com' })
    @IsEmail({}, { message: 'E-mail inválido.' })
    email: string;

    @ApiProperty({ example: '1995-05-20' })
    @IsString()
    @IsNotEmpty()
    dataNascimento: string;
}
