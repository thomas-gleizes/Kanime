import { EntryStatus, Visibility } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min
} from 'class-validator'

import { QueryParamsDto } from 'dto/global.dto'

export class QueryEntryListDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  orderBy: string | undefined

  @IsString()
  @IsOptional()
  status: string | undefined
}

export class UpdateEntryDto {
  @IsEnum(EntryStatus, { message: 'Le statut doit être un statut valide' })
  @IsOptional()
  status: Optional<EntryStatus>

  @IsInt({ message: "Le nombre d'episodes vues doit être un entier" })
  @Type(() => Number)
  @IsOptional()
  @Min(0, { message: "Le nombre d'episodes vues doit être supérieur ou égal à 0" })
  progress: Optional<number>

  @IsNumber({}, { message: 'La note doit être un nombre' })
  @Type(() => Number)
  @IsOptional()
  @Max(10, { message: 'La note doit être inférieur ou égal à 10' })
  @Min(0, { message: 'La note doit être supérieur ou égal à 0' })
  rating: Optional<number>

  @IsString({ message: 'Le commentaire doit être une chaîne de caractères' })
  @IsOptional()
  @MaxLength(500, { message: 'Le commentaire doit contenir au plus 500 caractères' })
  note: Optional<string>

  @IsDateString({ message: 'La date doit être une date valide' })
  @IsOptional()
  startedAt: Optional<Date | string>

  @IsDateString({ message: 'La date doit être une date valide' })
  @IsOptional()
  finishAt: Optional<Date | string>

  @IsEnum(Visibility, { message: 'La visibilité doit être une visibilité valide' })
  @IsOptional()
  visibility: Visibility | undefined
}

export class CreateEntryDto extends UpdateEntryDto {
  @Type(() => Number)
  @IsInt({ message: "L'id de l'anime doit être un entier" })
  animeId!: number
}
