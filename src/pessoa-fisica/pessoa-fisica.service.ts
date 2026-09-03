import { Injectable } from '@nestjs/common';

export interface PessoaFisicaResponse {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    dataNascimento: string;
}

@Injectable()
export class PessoaFisicaService {
    private pessoas: Array<PessoaFisicaResponse> = [];

    private isCpfValido(cpf: string): boolean {
        const cpfLimpo = cpf.replace(/\D/g, '');

        if (!cpfLimpo || cpfLimpo.length !== 11 || /^\d{11}$/.test(cpfLimpo) === false) {
            return false;
        }

        const invalidos = [
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999',
        ];

        if (invalidos.includes(cpfLimpo)) {
            return false;
        }

        const numeros = cpfLimpo.split('').map(Number);

        const calcularDigito = (pesoInicial: number, quantidade: number) => {
            const soma = numeros.slice(0, quantidade).reduce((total, digito, index) => {
                return total + digito * (pesoInicial - index);
            }, 0);

            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };

        const primeiroDigito = calcularDigito(10, 9);
        if (numeros[9] !== primeiroDigito) {
            return false;
        }

        const segundoDigito = calcularDigito(11, 10);
        return numeros[10] === segundoDigito;
    }

    create(dto: {
        nome: string;
        cpf: string;
        email: string;
        dataNascimento: string;
    }): PessoaFisicaResponse {
        if (!this.isCpfValido(dto.cpf)) {
            throw new Error('CPF inválido.');
        }

        const pessoa = {
            id: this.pessoas.length + 1,
            nome: dto.nome,
            cpf: dto.cpf.replace(/\D/g, ''),
            email: dto.email,
            dataNascimento: dto.dataNascimento,
        };

        this.pessoas.push(pessoa);
        return pessoa;
    }
}
