import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { QueryParamsDto } from 'dto/global.dto';
import { Gender } from '@prisma/client';

export class SearchUserQueryDto extends QueryParamsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  query: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  birthday?: Date;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  background: any;

  @IsOptional()
  avatar: any;

  @IsOptional()
  @IsString()
  gender: Gender;
}

// city: string;
// birthday: Date | string;
// bio: string;
// avatar: UserMediaHandling | string;
// background: UserMediaHandling | string;
// gender: Gender;
