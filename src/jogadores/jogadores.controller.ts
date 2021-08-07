import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  @Post()
  public async criarAtualizarJogador(
    @Body() jogador: CriarJogadorDTO,
  ): Promise<CriarJogadorDTO> {
    const { email } = jogador;
    return jogador;
  }
}
