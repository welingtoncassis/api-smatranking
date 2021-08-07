import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoresService: JogadoresService) {}
  @Post()
  public async criarAtualizarJogador(
    @Body() jogador: CriarJogadorDTO,
  ): Promise<void> {
    return this.jogadoresService.criarAtualizarJogador(jogador);
  }
}
