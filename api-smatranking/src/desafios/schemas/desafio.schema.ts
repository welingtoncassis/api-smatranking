import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Jogador } from '../../jogadores/schemas/jogador.schema';
import { Partida } from './partida.schema';

export type DesafioDocument = Desafio & mongoose.Document;

@Schema({ collection: 'desafios', timestamps: true })
export class Desafio extends mongoose.Document {
  @Prop({ type: Date, required: true })
  dataHoraDesafio: Date;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Date })
  dataHoraSolicitacao: Date;

  @Prop({ type: Date })
  dataHoraResposta: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Jogador.name })
  solicitante: Jogador;

  @Prop({ type: String })
  categoria: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Jogador.name }] })
  jogadores: Jogador[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Partida.name })
  partida: Partida;
}

export const DesafioSchema = SchemaFactory.createForClass(Desafio);
