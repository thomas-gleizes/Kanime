import { ApiRequest, ApiResponse } from 'next/app';

export default function queryParser(req: ApiRequest, res: ApiResponse, next): void {
  for (const [key, value] of Object.entries(req.query)) {
    if (key.match(/\[\]$/)) {
      req.query[key.replace(/\[\]$/, '')] = value;
      delete req.query[key];
    }
  }

  for (const [key, value] of Object.entries(req.query)) {
    try {
      req.query[key] = JSON.parse(value as string);
    } catch (e) {}
  }

  next();
}
