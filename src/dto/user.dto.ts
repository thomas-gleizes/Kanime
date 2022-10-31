import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'
import { Gender } from '@prisma/client'

import { QueryParamsDto } from 'dto/global.dto'

export class SearchUserQueryDto extends QueryParamsDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le nom ne doit pas être vide' })
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  query!: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  city?: string

  @IsOptional()
  @IsDateString({ message: 'La date doit être une date valide' })
  birthday?: Date | string

  @IsOptional()
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  bio?: string

  @IsOptional()
  background!: any

  @IsOptional()
  avatar!: any

  @IsOptional()
  @IsEnum(Gender, { message: 'Le genre doit être un genre valide' })
  gender!: Gender
}
