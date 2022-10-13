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
  @MaxLength(250, { message: 'Le post doit contenir au plus 250 caractères' })
  @MinLength(1, { message: 'Le post doit contenir au moins 1 caractère' })
  @IsString({ message: 'Le post doit être une chaîne de caractères' })
  content!: string;

  @IsNumber({}, { message: 'Le post doit être un nombre' })
  @Type(() => Number)
  @IsOptional()
  parentId!: number;
}
