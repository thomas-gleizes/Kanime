import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParamsDto {
  @IsNumber()
  @Type(() => Number)
  @Max(50)
  @Min(1)
  @IsOptional()
  limit: number;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @IsOptional()
  skip: number;
}
