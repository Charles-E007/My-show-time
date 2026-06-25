import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  UseGuards,
  // Render,
  // Redirect,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
    @Res() res: Response,
  ) {
    await this.authService.register(body.name, body.email, body.password);
    return res.redirect('/login');
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  // login(@Req() req: Request, @Res() res: Response) {
  login(@Res() res: Response) {
    return res.redirect('/');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Req() req): string {
    return req.user;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        console.error(err);
        return res.redirect('/');
      }

      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        // return res.redirect('/');
        res.redirect('/');
      });
    });
  }
}
