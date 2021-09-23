import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JogadorDTO } from './dtos/jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateJogadorDTO } from './dtos/update-jogador.dto';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  public async criarJogador(jogadorDTO: JogadorDTO): Promise<Jogador> {
    const { email } = jogadorDTO;

    const jogadorEncontrado = await this.consultarJogadoresPorEmail(email);

    if (jogadorEncontrado) {
      throw new BadRequestException(`Email ${email} já cadastrado.`);
    }
    const jogadorCriado = new this.jogadorModel(jogadorDTO);
    this.logger.log(`Jogador a ser criado: ${JSON.stringify(jogadorCriado)}`);
    return jogadorCriado.save();
  }

  public async atualizarJogador(
    _id: string,
    updateJogadorDTO: UpdateJogadorDTO,
  ): Promise<void> {
    console.log(_id);
    const jogadorEncontrado = await this.consultarJogadoresPeloId(_id);

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador não encontrado`);
    }
    this.logger.log(
      `Jogador para atualizar: ${JSON.stringify(updateJogadorDTO)}`,
    );
    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: updateJogadorDTO })
      .exec();
  }

  public async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async consultarJogadoresPeloId(_id: string) {
    return this.jogadorModel.findOne({ _id }).exec();
  }

  public async consultarJogadoresPorEmail(email: string): Promise<Jogador> {
    return this.jogadorModel.findOne({ email }).exec();
  }

  public async deletarJogador(_id: string): Promise<any> {
    const jogadorEncontrado = await this.consultarJogadoresPeloId(_id);
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }

    return this.jogadorModel.deleteOne({ _id }).exec();
  }
}
