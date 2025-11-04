// auth/auth.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterInput, LoginInput } from './auth.input';
import { AuthResponse } from './auth.output';
import { User } from '../users/user.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('register')
  async register(@Body() input: RegisterInput){
    return this.authService.register(input.username, input.password);
  }

  @Post('login')
  async login(@Body() input: LoginInput){
    const user = await this.authService.validateUser(input.username, input.password);
    if (!user) throw new Error('ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە');
    return this.authService.login(user);
  }
}
