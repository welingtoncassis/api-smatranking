import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JogadorDocument = Jogador & Document;

@Schema({ collection: 'jogadores', timestamps: true })
export class Jogador {
  @Prop({ type: String, required: true })
  telefoneCelular: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  nome: string;

  @Prop({ type: String })
  ranking: string;

  @Prop({ type: Number })
  posicaoRanking: number;

  @Prop({ type: String })
  urlFotoJogador: string;
}

export const JogadorSchema = SchemaFactory.createForClass(Jogador);

// import * as mongoose from 'mongoose';

// export const JogadorSchema = new mongoose.Schema({
//   telefoneCelular: { type: String, unique: true },
//   email: { type: String, unique: true },
//   nome: String,
//   ranking: String,
//   posicaoRanking: Number,
//   urlFotoJogador: String,
// }, { timestamps: true, collection: 'jogadores'});
