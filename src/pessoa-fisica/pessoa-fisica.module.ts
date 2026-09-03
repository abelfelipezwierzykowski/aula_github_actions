import { Module } from '@nestjs/common';
import { PessoaFisicaController } from './pessoa-fisica.controller';
import { PessoaFisicaService } from './pessoa-fisica.service';

@Module({
    controllers: [PessoaFisicaController],
    providers: [PessoaFisicaService],
    exports: [PessoaFisicaService],
})
export class PessoaFisicaModule { }
