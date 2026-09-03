import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PessoaFisicaController } from './pessoa-fisica.controller';
import { PessoaFisicaService } from './pessoa-fisica.service';

describe('PessoaFisicaController', () => {
    let controller: PessoaFisicaController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PessoaFisicaController],
            providers: [PessoaFisicaService],
        }).compile();

        controller = module.get<PessoaFisicaController>(PessoaFisicaController);
    });

    it('deve cadastrar pessoa física com CPF válido', () => {
        const result = controller.cadastrar({
            nome: 'Maria da Silva',
            cpf: '52998224725',
            email: 'maria@email.com',
            dataNascimento: '1995-05-20',
        });

        expect(result).toMatchObject({
            nome: 'Maria da Silva',
            cpf: '52998224725',
            email: 'maria@email.com',
            dataNascimento: '1995-05-20',
        });
        expect(result.id).toBeGreaterThan(0);
    });

    it('deve rejeitar CPF inválido', () => {
        expect(() =>
            controller.cadastrar({
                nome: 'João',
                cpf: '11111111111',
                email: 'joao@email.com',
                dataNascimento: '1990-01-01',
            }),
        ).toThrow(BadRequestException);
    });
});
