import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    traceId?: string;
    auth?: any;
    log: import('pino').Logger;
  }
}