import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import type { UserResponse } from './auth.service';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Criar usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    register(@Body() createUserDto: CreateUserDto): UserResponse {
        return this.authService.createUser(createUserDto);
    }
}
