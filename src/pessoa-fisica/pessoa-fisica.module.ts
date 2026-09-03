import { Module } from '@nestjs/common';
import { PessoaFisicaService } from './pessoa-fisica.service';

@Module({
    providers: [PessoaFisicaService],
    exports: [PessoaFisicaService],
})
export class PessoaFisicaModule { }
