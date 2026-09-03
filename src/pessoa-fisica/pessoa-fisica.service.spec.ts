import { PessoaFisicaService } from './pessoa-fisica.service';

describe('PessoaFisicaService', () => {
    const service = new PessoaFisicaService();

    const cpfValido = '5299822472';

    const dadosValidos = {
        nome: 'Maria Oliveira',
        cpf: cpfValido,
        email: 'maria.oliveira@email.com',
        dataNascimento: '1998-05-10',
        telefone: '11999998888',
        rua: 'Avenida Brasil',
        numero: '456',
        cidade: 'São Paulo',
        estado: 'SP',
    };

    it('deve aceitar um cadastro válido', () => {
        const resultado = service.validarCadastro(dadosValidos);

        expect(resultado.isValid).toBe(true);
        expect(resultado.errors).toEqual([]);
    });

    it('deve rejeitar nome vazio', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, nome: '' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('nome é obrigatório');
    });

    it('deve rejeitar nome muito curto', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, nome: 'A' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('nome deve ter pelo menos 2 caracteres');
    });

    it('deve rejeitar cpf inválido', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, cpf: '12345678900' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('cpf inválido');
    });

    it('deve rejeitar cpf com formato inválido', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, cpf: '529.982.247-25' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('cpf deve conter 11 dígitos numéricos');
    });

    it('deve rejeitar email inválido', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, email: 'maria@' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('email inválido');
    });

    it('deve rejeitar data de nascimento inválida', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, dataNascimento: '2025-01-01' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('data de nascimento deve ser anterior à data atual e maior de idade');
    });

    it('deve rejeitar telefone inválido', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, telefone: '9999' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('telefone inválido');
    });

    it('deve rejeitar rua vazia', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, rua: '' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('rua é obrigatória');
    });

    it('deve rejeitar número do endereço vazio', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, numero: '' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('número do endereço é obrigatório');
    });

    it('deve rejeitar cidade vazia', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, cidade: '' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('cidade é obrigatória');
    });

    it('deve rejeitar estado inválido', () => {
        const resultado = service.validarCadastro({ ...dadosValidos, estado: 'ZZ' });

        expect(resultado.isValid).toBe(false);
        expect(resultado.errors).toContain('estado inválido');
    });
});
