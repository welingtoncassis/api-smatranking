import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern('criar-categoria')
  public async criarCategoria(@Payload() categoria: Categoria) {
    this.logger.log(`categoria: ${JSON.stringify(categoria)}`);
    await this.appService.criarCategoria(categoria);
  }

  @MessagePattern('consultar-categorias')
  public async consultarCategorias(@Payload() _id: string) {
    this.logger.log(`consultar categoria: ${JSON.stringify(_id)}`);
    if (_id) {
      return await this.appService.listarCategoriaPeloId(_id);
    } else {
      return await this.appService.listarCategorias();
    }
  }
}
