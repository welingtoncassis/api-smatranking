import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';

@Controller({ version: '1', path: 'api' })
export class AppController {
  private readonly logger = new Logger(AppController.name);
  private clientAdminBackend: ClientProxy;

  constructor(private readonly configService: ConfigService) {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5672'],
        queue: 'admin-backend',
      },
    });
  }

  async onApplicationBootstrap() {
    await this.clientAdminBackend.connect();
  }

  @Post('categorias')
  @UsePipes(ValidationPipe)
  criarCategoria(@Body() criarCategoriaDTO: CriarCategoriaDTO) {
    this.clientAdminBackend.emit('criar-categoria', criarCategoriaDTO);
  }

  @Get('categorias')
  consultarCategoria(@Query('idCategoria') _id: string): Observable<any> {
    return this.clientAdminBackend.send('consultar-categorias', _id ? _id : '');
  }
}
