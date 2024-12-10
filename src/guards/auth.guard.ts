import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException
} from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@/services'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyToken(token)
      request['user'] = {
        id: payload.id,
        role: payload.role
      }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }
    return true
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const authorizationHeader = request.headers.authorization
    if (!authorizationHeader) {
      return undefined
    }
    const [type, token] = authorizationHeader.split(' ')
    return type === 'Bearer' ? token : undefined
  }
}

export const IS_PUBLIC_KEY = 'isPublic'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
