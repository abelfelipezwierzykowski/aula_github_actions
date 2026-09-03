import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('PessoaFisicaController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /pessoa-fisica/cadastro com CPF válido', () => {
    return request(app.getHttpServer())
      .post('/pessoa-fisica/cadastro')
      .send({
        nome: 'Maria da Silva',
        cpf: '52998224725',
        email: 'maria@email.com',
        dataNascimento: '1995-05-20',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.nome).toBe('Maria da Silva');
        expect(body.cpf).toBe('52998224725');
        expect(body.email).toBe('maria@email.com');
        expect(body.id).toBeGreaterThan(0);
      });
  });

  it('POST /pessoa-fisica/cadastro com CPF inválido', () => {
    return request(app.getHttpServer())
      .post('/pessoa-fisica/cadastro')
      .send({
        nome: 'João',
        cpf: '11111111111',
        email: 'joao@email.com',
        dataNascimento: '1990-01-01',
      })
      .expect(400)
      .expect(({ body }) => {
        expect(body.message).toContain('CPF');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
