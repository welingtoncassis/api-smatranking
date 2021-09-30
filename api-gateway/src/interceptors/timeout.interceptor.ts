import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, timeout } from 'rxjs';

/**
 * Se a requisição demorar mais de 10s este interceptor irá capturar a requisição
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private logger = new Logger(TimeoutInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(timeout(10000));
  }
}
