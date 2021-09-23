import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Jogador } from 'src/jogadores/schemas/jogador.schema';
import { Evento } from '../interfaces/evento.interface';
export type CategoriaDocument = Categoria & Document;

@Schema({ collection: 'categorias', timestamps: true })
export class Categoria {
  @Prop({ type: String, required: true, unique: true })
  categoria: string;

  @Prop({ type: String })
  descricao: string;

  @Prop([
    {
      nome: { type: String },
      operacao: { type: String },
      valor: { type: Number },
    },
  ])
  eventos: Evento[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Jogador' }] })
  jogadores: Jogador[];
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
