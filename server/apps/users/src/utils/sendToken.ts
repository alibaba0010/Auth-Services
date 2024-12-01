import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';

export class AuthToken {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  public accessToken(user: Users) {
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
    return { accessToken, refreshToken };
  }
}
