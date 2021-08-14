import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JogadorDTO } from './dtos/jogador.dto';
import { UpdateJogadorDTO } from './dtos/update-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  public async criarJogador(@Body() jogadorDTO: JogadorDTO): Promise<Jogador> {
    return this.jogadoresService.criarJogador(jogadorDTO);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  public async atualizarJogador(
    @Body() updateJogadorDTO: UpdateJogadorDTO,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    console.log(_id);
    return this.jogadoresService.atualizarJogador(_id, updateJogadorDTO);
  }

  @Get()
  public async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadoresService.consultarJogadores();
  }

  @Get('/:_id')
  public async consultarJogadorPeloId(
    @Param('_id') _id: string,
  ): Promise<Jogador> {
    return this.jogadoresService.consultarJogadoresPeloId(_id);
  }

  @Delete('/:_id')
  public async deletarJogadores(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    return this.jogadoresService.deletarJogador(_id);
  }
}
