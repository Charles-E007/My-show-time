import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request, Response } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as any;

    if (!user) {
      const res = context.switchToHttp().getResponse<Response>();
      res.redirect('/login');
      return false;
    }

    if (user.role !== 'admin') {
      const res = context.switchToHttp().getResponse<Response>();
      res.redirect('/');
      return false;
    }

    return true;
  }
}