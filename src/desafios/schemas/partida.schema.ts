import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Jogador } from '../../jogadores/schemas/jogador.schema';

export type PartidaDocument = Partida & mongoose.Document;

@Schema({ collection: 'desafios', timestamps: true })
export class Partida extends mongoose.Document {
  @Prop({ type: String })
  categoria: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Jogador.name }] })
  jogadores: Jogador[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Jogador.name })
  def: Jogador;

  @Prop(
    raw([
      {
        set: { type: String },
      },
    ]),
  )
  resultado: Record<string, any>[];
}

export const PartidaSchema = SchemaFactory.createForClass(Partida);
