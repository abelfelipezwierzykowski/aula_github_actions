import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PessoaFisicaModule } from './pessoa-fisica/pessoa-fisica.module';

@Module({
  imports: [AuthModule, PessoaFisicaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
