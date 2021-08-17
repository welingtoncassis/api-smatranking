import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './schemas/categoria.schema';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger(CategoriasService.name);

  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  public async criarCategoria(criarCategoriaDTO: CriarCategoriaDTO) {
    const { categoria } = criarCategoriaDTO;

    const categoriaEncontrada = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();

    if (categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
    }

    const categoriaCriada = new this.categoriaModel(criarCategoriaDTO);
    return categoriaCriada.save();
  }
}
