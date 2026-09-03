import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('PessoaFisicaController routes', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('POST /pessoa-fisica/cadastro deve criar pessoa com CPF válido', async () => {
        const response = await request(app.getHttpServer())
            .post('/pessoa-fisica/cadastro')
            .send({
                nome: 'Maria da Silva',
                cpf: '52998224725',
                email: 'maria@email.com',
                dataNascimento: '1995-05-20',
            })
            .expect(201);

        expect(response.body).toMatchObject({
            nome: 'Maria da Silva',
            cpf: '52998224725',
            email: 'maria@email.com',
        });
        expect(response.body.id).toBeGreaterThan(0);
    });

    it('POST /pessoa-fisica/cadastro deve rejeitar CPF inválido', async () => {
        const response = await request(app.getHttpServer())
            .post('/pessoa-fisica/cadastro')
            .send({
                nome: 'João da Silva',
                cpf: '11111111111',
                email: 'joao@email.com',
                dataNascimento: '1990-01-01',
            })
            .expect(400);

        expect(response.body.message).toContain('CPF');
    });

    afterAll(async () => {
        await app.close();
    });
});
