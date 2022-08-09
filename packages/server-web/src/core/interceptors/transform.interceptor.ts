import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  retcode: number;
  message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data) => {
        // console.log('datadatadatadata', data);
        // const res: Response<T> = {
        //   data,
        //   retcode: 0,
        //   message: '请求成功',
        // };
        // console.log('intercept ==== res:', res);
        return data;
      }),
    );
  }
}
