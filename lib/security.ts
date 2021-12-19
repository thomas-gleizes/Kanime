import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Security {
  private static readonly SECRET_TOKEN: string = process.env.NODE_SECRET_TOKEN;
  private static readonly SEED: string = process.env.NODE_PASS_SEED;
  private static readonly SALT: number = 10;

  static hash(str: string): Promise<string> {
    return bcrypt.hash(this.SEED + str, this.SALT);
  }

  static compare(str: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(this.SEED + str, encrypted);
  }

  static sign(payload: any): string {
    return jwt.sign({ user: payload }, this.SECRET_TOKEN, { expiresIn: '1d' });
  }

  static verifyToken(token): boolean {
    return !!jwt.verify(token, this.SECRET_TOKEN);
  }

  static getTokenPayload(token): any {
    return jwt.verify(token, this.SECRET_TOKEN);
  }
}

export default Security;
