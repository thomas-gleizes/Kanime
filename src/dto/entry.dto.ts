import { IsOptional, IsString } from 'class-validator';
import { QueryParamsDto } from 'dto/global.dto';

export class QueryEntryListDto extends QueryParamsDto {
  @IsString()
  @IsOptional()
  orderBy: string;

  @IsString()
  @IsOptional()
  status: string;
}
