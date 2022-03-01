import jwt from 'jsonwebtoken';
import createHash from 'create-hash';

class Security {
  private static readonly SECRET_TOKEN: string = process.env.SECRET_TOKEN;

  static sha256(stringToHash: string): string {
    const hash = createHash('sha512');

    hash.update(stringToHash);
    const hashedString: string = hash.digest().toString('base64url');
    hash.end();

    return hashedString;
  }

  static compare(str: string, encrypted: string): boolean {
    return this.sha256(str) === encrypted;
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
