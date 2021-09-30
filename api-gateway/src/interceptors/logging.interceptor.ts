import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const handler = context.getHandler().name;
    const startTime = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Method: ${handler}() runtime: ${Date.now() - startTime}ms`,
          ),
        ),
      );
  }
}
