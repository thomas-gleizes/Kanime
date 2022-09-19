import { EntryStatus, Visibility } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { QueryParamsDto } from 'dto/global.dto';

export class QueryEntryListDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  orderBy: string;

  @IsString()
  @IsOptional()
  status: string;
}

export class UpdateEntryDto {
  @IsEnum(EntryStatus)
  @IsOptional()
  status: EntryStatus;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  progress: number;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  @Max(10)
  @Min(0)
  rating: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  note: string;

  @IsDateString()
  @IsOptional()
  startedAt: Date | string;

  @IsDateString()
  @IsOptional()
  finishAt: Date | string;

  @IsEnum(Visibility)
  @IsOptional()
  visibility: Visibility;
}

export class CreateEntryDto extends UpdateEntryDto {
  @Type(() => Number)
  @IsInt()
  animeId: number;
}
