import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface UserResponse {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class AuthService {
    private users: Array<UserResponse & { password: string }> = [];

    createUser(dto: CreateUserDto): UserResponse {
        const user = {
            id: this.users.length + 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };

        this.users.push(user);

        const { password: _, ...safeUser } = user;
        return safeUser;
    }
}
