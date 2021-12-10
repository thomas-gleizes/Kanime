import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Security {
  private static SECRET_TOKEN: string = process.env.NODE_SECRET_TOKEN;
  private static SEED: string = process.env.NODE_PASS_SEED;
  private static SALT: number = 10;

  static hash(str: string): Promise<string> {
    return bcrypt.hash(this.SEED + str, this.SALT);
  }

  static compare(str: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(this.SEED + str, encrypted);
  }

  static sign(payload: any): string {
    return jwt.sign(payload, this.SECRET_TOKEN, { expiresIn: '1d' });
  }
}

export default Security;
