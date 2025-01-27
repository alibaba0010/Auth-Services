import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(context);
    const { req } = graphqlContext.getContext();

    const accessToken = req.headers.accesstoken as string;
    const refreshToken = req.headers.refreshtoken as string;

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Please login to get access');
    }
    if (accessToken) {
      // const decoded = this.jwtService.decode(accessToken);

      const decode = await this.jwtService.verify(accessToken, {
        secret: this.configService.get<string>('JWT_ACESS_SEC'),
      });
      if (!decode) {
        throw new UnauthorizedException('Invalid access, login again');
      }
      console.log('Decoded: ' + JSON.stringify(decode));
      const expirationTime = decode?.exp;

      if (expirationTime * 1000 < Date.now()) {
        await this.updateAccessToken(req);
      } else {
        throw new UnauthorizedException('Login again');
      }
    }
    return true;
  }
  private async updateAccessToken(req: any) {
    const refreshTokenData = req.headers.refreshtoken as string;
    const decoded = await this.jwtService.verify(refreshTokenData, {
      secret: this.configService.get<string>('JWT_REFRESH_SEC'),
    });
    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token, login again');
    }
    const user = await this.prismaService.users.findUnique({
      where: { id: decoded.id },
    });
    const { id, email } = user;
    const accessToken = this.jwtService.sign(
      {
        id,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_ACESS_SEC'),
        expiresIn: '2h',
      },
    );

    // refresh token
    const refreshToken = this.jwtService.sign(
      {
        id,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_REFRESH_SEC'),
        expiresIn: '2d',
      },
    );
    req.accessToken = accessToken;
    req.refreshToken = refreshToken;
    req.user = user;
  }
}
