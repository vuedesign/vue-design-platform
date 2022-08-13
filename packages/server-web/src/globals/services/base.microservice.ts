import { FindOptionsRelations, FindManyOptions } from 'typeorm';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export interface IPagination {
  page: number;
  size: number;
}

export interface IPaginationResponse {
  list: Array<any>;
  pagination: {
    page: number;
    size: number;
  };
  total: number;
}

export interface IPaginationQuery {
  page?: number;
  size?: number;
  order?: object;
  where?: object;
  relations?: FindOptionsRelations<any>;
  select?: object;
}

export interface IPaginationOptions<E = any> extends FindManyOptions<E> {
  pagination?: IPagination;
}

export interface SendPattern {
  module: string;
  method: string;
}

export class BaseMicroservice {
  constructor(
    @Inject('BASE_MICROSERVICE') private readonly client?: ClientProxy,
  ) {}

  send<R, D = any>(pattern: SendPattern, data: D = null): Promise<R> {
    return lastValueFrom(
      this.client.send<R>(
        { module: pattern.module, method: pattern.method },
        data || true,
      ),
    );
  }
}
