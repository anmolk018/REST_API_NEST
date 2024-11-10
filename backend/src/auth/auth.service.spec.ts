// This Is Not Completed Yet

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  let jwtService: Partial<jest.Mocked<JwtService>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService,],
    }).compile();

  })

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('refreshAccessToken', () => {

    it('should return access token if refresh token valid', async () => {
      const refreshToken = 'refreshToken';
      const decodedToken = { userId: 1, userName: 'Anil Dev', userEmail: 'anildev@yopmail.com' };

      (jwtService.verify).mockReturnValue(decodedToken);
      (jwtService.signAsync).mockResolvedValue('newAccessToken');

      const result = await authService.refreshAccessToken(refreshToken);

      expect(result).toEqual({ accessToken: 'newAccessToken' });
    });

    it('should throw Exception if refresh token invalid', async () => {
      (jwtService.verify).mockImplementation(() => {
        throw new Error('invalid token');
      });

      await expect(authService.refreshAccessToken('invalidToken')).rejects.toThrow(UnauthorizedException);
    });

  });
});
