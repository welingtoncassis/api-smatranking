import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/schemas/jogador.schema';
import { Evento } from './evento.interface';

export interface Categoria extends Document {
  readonly categoria: string;
  descricao: string;
  eventos: Array<Evento>;
  jogadores: Array<Jogador>;
}
