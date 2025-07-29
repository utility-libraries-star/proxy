import type { Request, Response, NextFunction } from 'express';
export default function handler(req: Request, res: Response, next: NextFunction): Promise<void>;
