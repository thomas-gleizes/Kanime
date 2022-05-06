import { ApiRequest, ApiResponse } from 'app/next';
import { loggerService } from 'services/logger.service';
import trace from 'utils/trace';

export function apiLogger(req: ApiRequest, res: ApiResponse, next): void {
  loggerService(req);
  trace(req.method, req.url);

  next();
}
