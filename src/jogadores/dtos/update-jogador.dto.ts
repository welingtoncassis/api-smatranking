import { IsNotEmpty } from 'class-validator';

export class UpdateJogadorDTO {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  readonly nome: string;
}
