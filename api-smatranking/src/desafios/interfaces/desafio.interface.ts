import { Jogador } from '../../jogadores/schemas/jogador.schema';
import { Partida } from './partida.interface';
import { DesafioStatus } from '../enums/desafioStatus.enum';

export interface Desafio extends Document {
  dataHoraDesafio: Date;
  status: DesafioStatus;
  dataHoraSolicitacao: Date;
  dataHoraResposta: Date;
  solicitante: Jogador;
  categoria: string;
  jogadores: Array<Jogador>;
  partida: Partida;
}
