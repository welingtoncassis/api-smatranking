import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JogadorDTO } from './dtos/jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  public async criarAtualizarJogador(jogadorDTO: JogadorDTO): Promise<void> {
    const { email } = jogadorDTO;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      this.atualizar(jogadorDTO);
    } else {
      this.criar(jogadorDTO);
    }
  }

  public async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  public async consultarJogadoresPorEmail(email: string) {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }

    return jogadorEncontrado;
  }

  public async deletarJogadorPorEmail(email: string): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }

    return this.jogadorModel.remove({ email }).exec();
  }

  private async criar(jogadorDTO: JogadorDTO): Promise<Jogador> {
    const jogadorCriado = new this.jogadorModel(jogadorDTO);
    this.logger.log(`Jogador criado: ${JSON.stringify(jogadorCriado)}`);
    return await jogadorCriado.save();
  }

  private async atualizar(jogadorDTO: JogadorDTO) {
    this.logger.log(`Jogador para atualizar: ${JSON.stringify(jogadorDTO)}`);
    return await this.jogadorModel
      .findOneAndUpdate({ email: jogadorDTO.email }, { $set: jogadorDTO })
      .exec();
  }
}
