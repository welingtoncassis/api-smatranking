import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { DesafioStatus } from '../enums/desafioStatus.enum';
import { CreateDesafioDto } from './create-desafio.dto';

export class UpdateDesafioDto extends PartialType(CreateDesafioDto) {
  @IsOptional()
  status: DesafioStatus;
}
