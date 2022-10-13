import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParamsDto {
  @IsInt({ message: 'La valeur doit être un entier' })
  @Type(() => Number)
  @Max(50, { message: 'La valeur doit être inférieur ou égal à 50' })
  @Min(1, { message: 'La valeur doit être supérieur ou égal à 1' })
  @IsOptional()
  limit: number | undefined;

  @IsInt({ message: 'La valeur doit être un entier' })
  @Type(() => Number)
  @Min(0, { message: 'La valeur doit être supérieur ou égal à 0' })
  @IsOptional()
  skip: number | undefined;
}
