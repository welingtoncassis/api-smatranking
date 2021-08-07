import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  public async criarAtualizarJogador(
    criarJogadorDTO: CriarJogadorDTO,
  ): Promise<void> {
    await this.criar(criarJogadorDTO);
  }

  private async criar(criarJogadorDTO: CriarJogadorDTO): Promise<void> {
    const { nome, telefoneCelular, email } = criarJogadorDTO;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`Jogador criado: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }
}
