import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './schemas/categoria.schema';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDTO: CriarCategoriaDTO,
  ): Promise<Categoria> {
    return this.categoriasService.criarCategoria(criarCategoriaDTO);
  }
}
