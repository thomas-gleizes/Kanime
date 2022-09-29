import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsString({ message: "Le nom d'utilisateur doit être une chaîne de caractères" })
  @IsNotEmpty({ message: "Le nom d'utilisateur est requis" })
  @MinLength(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" })
  @MaxLength(32, { message: "Le nom d'utilisateur doit contenir au plus 32 caractères" })
  username: string;

  @IsEmail({ message: "L'adresse email doit être une adresse email valide" })
  @IsNotEmpty({ message: "L'adresse email est requise" })
  @MaxLength(255, {
    message: "Le nom d'utilisateur doit contenir au plus 255 caractères",
  })
  email: string;

  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @MinLength(5, { message: 'Le mot de passe doit contenir au moins 5 caractères' })
  @MaxLength(255, {
    message: "Le nom d'utilisateur doit contenir au plus 255 caractères",
  })
  password: string;

  confirmPassword: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Type(() => Boolean)
  @IsBoolean()
  rememberMe: boolean;
}

export class ForgotPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
