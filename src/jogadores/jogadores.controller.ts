import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { JogadorDTO } from './dtos/jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoresService: JogadoresService) {}

  @Post()
  public async criarAtualizarJogador(
    @Body() jogadorDTO: JogadorDTO,
  ): Promise<void> {
    return this.jogadoresService.criarAtualizarJogador(jogadorDTO);
  }

  @Get()
  public async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return this.jogadoresService.consultarJogadoresPorEmail(email);
    } else {
      return this.jogadoresService.consultarJogadores();
    }
  }

  @Delete()
  public async deletarJogadores(@Query('email') email: string): Promise<void> {
    return this.jogadoresService.deletarJogadorPorEmail(email);
  }
}
