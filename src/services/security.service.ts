import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

class Security {
  private static readonly SECRET_TOKEN: string = process.env.SECRET_TOKEN;
  private static readonly SECRET_SEED: string = process.env.SECRET_SEED;

  static sha512(stringToHash: string): string {
    const hash = crypto.createHash('sha512');

    hash.update(stringToHash + this.SECRET_SEED);
    const hashedString: string = hash.digest().toString('hex');
    hash.end();

    return hashedString;
  }

  static compare(str: string, encrypted: string): boolean {
    return this.sha512(str) === encrypted;
  }

  static sign(payload: any, remember: boolean = false): string {
    return jwt.sign({ user: payload }, this.SECRET_TOKEN, {
      expiresIn: remember ? '60d' : '7d',
    });
  }

  static verifyToken(token): boolean {
    try {
      return !!jwt.verify(token, this.SECRET_TOKEN);
    } catch (e) {
      return false;
    }
  }

  static getTokenPayload(token): any {
    return jwt.verify(token, this.SECRET_TOKEN);
  }
}

export default Security;
