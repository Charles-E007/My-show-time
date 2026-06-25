declare namespace Express {
  interface Request {
    flash(message: string): { [key: string]: string[] };
    flash(type: string, message: string | string[]): void;
    flash(type: string): string[];

    isAuthenticated(): boolean;
    isUnauthenticated(): boolean;
    logout(callback: (err: any) => void): void;
    user?: any;
  }
}
