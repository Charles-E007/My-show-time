import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  UseGuards,
  Render,
  Redirect,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async postRegister(
    @Body() body: { name: string; email: string; password: string },
  ) {
    return this.authService.register(body.name, body.email, body.password);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async postLogin(@Req() req: Request) {
    return { message: 'Login successful', user: req.user };
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) return res.redirect('/');
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout successful' });
      });
    });
  }
}
