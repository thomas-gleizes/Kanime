import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'

class Security {
  private static readonly SECRET_TOKEN: string = process.env.SECRET_TOKEN as string
  private static readonly SECRET_SEED: string = process.env.SECRET_SEED as string

  private static shuffle(input: string): string {
    let output = ''

    for (const [index, char] of Object.entries(input)) {
      const code = char.charCodeAt(0)

      if (code % +index === 0) {
        output = output.concat(
          char,
          `${code << output.length}`,
          this.SECRET_SEED.substring(input.length - (+index % 5), input.length)
        )
      } else {
        output = char.concat(
          `${code << input.length}`,
          this.SECRET_SEED.substring(output.length - (+index % 8), output.length),
          output
        )
      }
    }

    return output
  }

  static sha512(stringToHash: string): string {
    const hash = crypto.createHash('sha512')

    hash.update(this.shuffle(stringToHash))
    const hashedString: string = hash.digest().toString('hex')
    hash.end()

    return hashedString
  }

  static compare(str: string, encrypted: string): boolean {
    return this.sha512(str) === encrypted
  }

  static sign(payload: any, remember: boolean = false): string {
    return jwt.sign({ user: payload }, this.SECRET_TOKEN, {
      expiresIn: remember ? '60d' : '7d'
    })
  }

  static verifyToken(token: string): boolean {
    try {
      return !!jwt.verify(token, this.SECRET_TOKEN)
    } catch (e) {
      return false
    }
  }

  static getTokenPayload(token: string): any {
    return jwt.verify(token, this.SECRET_TOKEN)
  }
}

export default Security
