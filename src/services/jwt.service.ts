import { JWTPayload, jwtVerify, importSPKI } from 'jose'

export interface IJwtPayload extends JWTPayload {
  id: number
  role: string
}

export class JwtService {
  constructor() {}

  private readonly algorithm = 'RS256'

  async verifyToken(token: string): Promise<IJwtPayload> {
    const spki = process.env.PUBLIC_KEY
    const publicKey = await importSPKI(spki, this.algorithm)

    const { payload } = await jwtVerify(token, publicKey)

    return payload as IJwtPayload
  }
}
