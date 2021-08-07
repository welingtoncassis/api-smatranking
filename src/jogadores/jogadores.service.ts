import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JogadorDTO } from './dtos/jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  public async criarAtualizarJogador(jogadorDTO: JogadorDTO): Promise<void> {
    const { email } = jogadorDTO;
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, jogadorDTO);
    } else {
      this.criar(jogadorDTO);
    }
  }

  public async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  public async consultarJogadoresPorEmail(email: string) {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }

    return jogadorEncontrado;
  }

  public async deletarJogadorPorEmail(email: string) {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }

    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }

  private async criar(jogadorDTO: JogadorDTO): Promise<void> {
    const { nome, telefoneCelular, email } = jogadorDTO;
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

  private atualizar(jogadorEncontrado: Jogador, jogadorDTO: JogadorDTO): void {
    const { nome } = jogadorDTO;
    jogadorEncontrado.nome = nome;
    this.logger.log(`Jogador atualizado: ${JSON.stringify(jogadorEncontrado)}`);
  }
}
