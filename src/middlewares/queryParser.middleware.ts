import { ApiRequest, ApiResponse } from 'next/app';

export default function queryParser(req: ApiRequest, res: ApiResponse, next): void {
  Object.entries(req.query).forEach(([key, value]) => {
    if (key.match(/\[\]$/)) {
      req.query[key.replace(/\[\]$/, '')] = value;
      delete req.query[key];
    }
  });

  next();
}
