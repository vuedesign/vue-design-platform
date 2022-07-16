import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

interface IPagination {
  page: number;
  size: number;
}

export interface IPaginatedType<T> {
  list: T[];
  total: number;
  pagination: IPagination;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Pagination`)
  abstract class Pagination {
    @Field((type) => Number)
    size: number;

    @Field((type) => Number)
    page: number;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => Pagination, { nullable: true })
    pagination: Pagination;

    @Field((type) => [classRef], { nullable: true })
    list: T[];

    @Field((type) => Int)
    total: number;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
