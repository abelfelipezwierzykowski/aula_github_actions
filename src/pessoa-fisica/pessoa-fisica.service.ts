import { Injectable } from '@nestjs/common';

export interface PessoaFisicaCadastro {
    nome: string;
    cpf: string;
    email: string;
    dataNascimento: string;
    telefone: string;
    rua: string;
    numero: string;
    cidade: string;
    estado: string;
}

export interface ValidacaoPessoaFisicaResult {
    isValid: boolean;
    errors: string[];
}

@Injectable()
export class PessoaFisicaService {
    validarCadastro(dados: PessoaFisicaCadastro): ValidacaoPessoaFisicaResult {
        const errors: string[] = [];

        if (!dados?.nome || dados.nome.trim() === '') {
            errors.push('nome é obrigatório');
        } else if (dados.nome.trim().length < 2) {
            errors.push('nome deve ter pelo menos 2 caracteres');
        }

        const cpf = (dados?.cpf ?? '').trim();
        const cpfNumerico = cpf.replace(/\D/g, '');
        if (!cpf) {
            errors.push('cpf é obrigatório');
        } else if (!/^\d{11}$/.test(cpf)) {
            errors.push('cpf deve conter 11 dígitos numéricos');
        } else if (!this.isCpfValido(cpfNumerico)) {
            errors.push('cpf inválido');
        }

        const email = dados?.email?.trim() ?? '';
        if (!email) {
            errors.push('email é obrigatório');
        } else if (!this.isEmailValido(email)) {
            errors.push('email inválido');
        }

        const dataNascimento = dados?.dataNascimento?.trim() ?? '';
        if (!dataNascimento) {
            errors.push('data de nascimento é obrigatória');
        } else if (!this.isDataNascimentoValida(dataNascimento)) {
            errors.push('data de nascimento deve ser anterior à data atual e maior de idade');
        }

        const telefoneRaw = (dados?.telefone ?? '').trim();
        const telefone = telefoneRaw.replace(/\D/g, '');
        if (!telefoneRaw) {
            errors.push('telefone é obrigatório');
        } else if (!/^\d{10,11}$/.test(telefoneRaw)) {
            errors.push('telefone inválido');
        }

        if (!dados?.rua || dados.rua.trim() === '') {
            errors.push('rua é obrigatória');
        }

        if (!dados?.numero || dados.numero.trim() === '') {
            errors.push('número do endereço é obrigatório');
        }

        if (!dados?.cidade || dados.cidade.trim() === '') {
            errors.push('cidade é obrigatória');
        }

        const estado = (dados?.estado ?? '').trim().toUpperCase();
        const estadosValidos = [
            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
            'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
        ];

        if (!dados?.estado || dados.estado.trim() === '') {
            errors.push('estado é obrigatório');
        } else if (!estadosValidos.includes(estado)) {
            errors.push('estado inválido');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }

    private isCpfValido(cpf: string): boolean {
        if (!/^(\d{11})$/.test(cpf)) {
            return false;
        }

        if (/^([0-9])\1+$/.test(cpf)) {
            return false;
        }

        const numeros = cpf.split('').map(Number);
        let soma = 0;
        let peso = 10;

        for (let i = 0; i < 9; i += 1) {
            soma += numeros[i] * peso;
            peso -= 1;
        }

        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        if (resto !== numeros[9]) {
            return false;
        }

        soma = 0;
        peso = 11;
        for (let i = 0; i < 10; i += 1) {
            soma += numeros[i] * peso;
            peso -= 1;
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }

        return resto === numeros[10];
    }

    private isEmailValido(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    private isDataNascimentoValida(dataNascimento: string): boolean {
        const data = new Date(dataNascimento);

        if (Number.isNaN(data.getTime())) {
            return false;
        }

        const hoje = new Date();
        if (data >= hoje) {
            return false;
        }

        const idade = hoje.getFullYear() - data.getFullYear();
        const mes = hoje.getMonth() - data.getMonth();
        const dia = hoje.getDate() - data.getDate();

        if (idade < 18) {
            return false;
        }

        if (idade === 18 && (mes < 0 || (mes === 0 && dia < 0))) {
            return false;
        }

        return true;
    }
}
