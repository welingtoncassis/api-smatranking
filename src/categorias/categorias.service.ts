import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from '../jogadores/jogadores.service';
import { AtualizarCategoriaDTO } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './schemas/categoria.schema';

@Injectable()
export class CategoriasService {
  private readonly logger = new Logger(CategoriasService.name);

  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private jogadoresService: JogadoresService,
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

  public async listarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().exec();
  }

  public async listarCategoriaPeloId(id: string) {
    const categoria = await this.categoriaModel
      .findById(id)
      .populate('jogadores')
      .exec();

    if (!categoria) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
    }
    return categoria;
  }

  public async atualizarCategoria(
    categoria: string,
    atualizarCategoriaDTO: AtualizarCategoriaDTO,
  ): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria id: ${categoria} não encontrada!`);
    }

    return this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoriaDTO })
      .exec();
  }

  public async atribuirCategoriaJogador(params: string[]) {
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada!`);
    }

    const jogadorJaCadastradoNaCategoria = await this.categoriaModel
      .find({ categoria })
      .where('jogadores')
      .in(idJogador);
    if (jogadorJaCadastradoNaCategoria.length > 0) {
      throw new BadRequestException(
        `Jogador id:${idJogador} já está cadastrado na categoria ${categoria}!`,
      );
    }

    const jogadorEncontrado =
      await this.jogadoresService.consultarJogadoresPeloId(idJogador);
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador id:${idJogador} não encontrada!`);
    }

    categoriaEncontrada.jogadores.push(idJogador);
    return this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();
  }
}
