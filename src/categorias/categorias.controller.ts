import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './schemas/categoria.schema';

@Controller({ version: '1', path: 'api/categorias' })
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Post()
  async criarCategoria(
    @Body() criarCategoriaDTO: CriarCategoriaDTO,
  ): Promise<Categoria> {
    return this.categoriasService.criarCategoria(criarCategoriaDTO);
  }

  @Get()
  async listarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriasService.listarCategorias();
  }

  @Get(':id')
  async listarCategoriaPeloId(@Param('id') id: string): Promise<Categoria> {
    return this.categoriasService.listarCategoriaPeloId(id);
  }

  @Patch(':categoria')
  async atualizarCategoria(
    @Body() atualizarCategoriaDTO: AtualizarCategoriaDTO,
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return this.categoriasService.atualizarCategoria(
      categoria,
      atualizarCategoriaDTO,
    );
  }

  @Post(':categoria/jogadores/:idJogador')
  async atribuirCategoriaJogador(@Param() params: string[]) {
    return this.categoriasService.atribuirCategoriaJogador(params);
  }
}
