import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should create a user', () => {
        const result = controller.register({
            name: 'Marco',
            email: 'marco@email.com',
            password: '123456',
        });

        expect(result).toMatchObject({
            name: 'Marco',
            email: 'marco@email.com',
        });
        expect(result.password).toBeUndefined();
    });
});
