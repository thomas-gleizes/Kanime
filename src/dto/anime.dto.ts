import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnimePostDto {
  @MaxLength(250)
  @MinLength(1)
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  parentId: number;
}
