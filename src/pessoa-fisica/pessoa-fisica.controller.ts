import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePessoaFisicaDto } from './dto/create-pessoa-fisica.dto';
import { PessoaFisicaService } from './pessoa-fisica.service';

@ApiTags('pessoa-fisica')
@Controller('pessoa-fisica')
export class PessoaFisicaController {
    constructor(private readonly pessoaFisicaService: PessoaFisicaService) { }

    @Post('cadastro')
    @ApiOperation({ summary: 'Cadastrar pessoa física' })
    @ApiResponse({ status: 201, description: 'Cadastro realizado com sucesso.' })
    @ApiResponse({ status: 400, description: 'CPF inválido ou dados incorretos.' })
    cadastrar(@Body() dto: CreatePessoaFisicaDto) {
        try {
            return this.pessoaFisicaService.create(dto);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
